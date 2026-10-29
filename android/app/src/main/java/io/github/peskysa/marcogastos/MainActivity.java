package io.github.peskysa.marcogastos;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.webkit.*;
import android.view.WindowInsets;
import android.print.PrintManager;
import org.json.JSONObject;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;

/** SPDX-License-Identifier: AGPL-3.0-only · Marco Pescador */
public class MainActivity extends Activity {
    private WebView web;
    private String pendingContent;
    private static final int SAVE=10, OPEN=11;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        web=new WebView(this);
        web.setBackgroundColor(0xfff6f6f0);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(false);
        web.getSettings().setSupportMultipleWindows(false);
        web.addJavascriptInterface(new Files(),"AndroidFiles");
        web.setWebViewClient(new WebViewClient(){
            @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){
                if(r.isForMainFrame()&&r.hasGesture()&&r.getUrl().toString().equals("https://github.com/Peskysa/marco-gastos")){
                    try{startActivity(new Intent(Intent.ACTION_VIEW,r.getUrl()));}catch(Exception e){result("No se pudo abrir el navegador.");}
                }
                return true;
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){
                Uri url=r.getUrl();String path=url.getPath();
                if(!"https".equals(url.getScheme())||!"gastos.local".equals(url.getHost())||path==null||path.contains(".."))return missing();
                String file=path.equals("/")?"index.html":path.substring(1);
                String mime=file.endsWith(".js")?"text/javascript":file.endsWith(".css")?"text/css":URLConnection.guessContentTypeFromName(file);
                try{return new WebResourceResponse(mime==null?"application/octet-stream":mime,"UTF-8",getAssets().open(file));}catch(IOException e){return missing();}
            }
            private WebResourceResponse missing(){return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",null,new ByteArrayInputStream(new byte[0]));}
        });
        setContentView(web);
        if(android.os.Build.VERSION.SDK_INT>=30){web.setOnApplyWindowInsetsListener((v,insets)->{android.graphics.Insets b=insets.getInsets(WindowInsets.Type.systemBars());v.setPadding(b.left,b.top,b.right,b.bottom);return insets;});web.requestApplyInsets();}
        if(state!=null)pendingContent=state.getString("pendingContent");
        web.loadUrl("https://gastos.local/");
    }
    public class Files {
        @JavascriptInterface public void save(String name,String content){runOnUiThread(()->{
            if(content.getBytes(StandardCharsets.UTF_8).length>5000000||(!name.equals("Marco-Gastos-Copia.json")&&!name.equals("Marco-Gastos-Original.json")&&!name.equals("Marco-Gastos-Mes.csv"))){result("Archivo no admitido o superior a 5 MB.");return;}
            pendingContent=content;
            Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT);i.addCategory(Intent.CATEGORY_OPENABLE);i.setType(name.endsWith(".json")?"application/json":"text/csv");i.putExtra(Intent.EXTRA_TITLE,name);
            try{startActivityForResult(i,SAVE);}catch(Exception e){pendingContent=null;result("No se pudo abrir el selector de archivos.");}
        });}
        @JavascriptInterface public void open(){runOnUiThread(()->{Intent i=new Intent(Intent.ACTION_OPEN_DOCUMENT);i.addCategory(Intent.CATEGORY_OPENABLE);i.setType("*/*");try{startActivityForResult(i,OPEN);}catch(Exception e){result("No se pudo abrir el selector de archivos.");}});}
        @JavascriptInterface public void print(){runOnUiThread(()->{PrintManager p=(PrintManager)getSystemService(PRINT_SERVICE);p.print("Marco Gastos",web.createPrintDocumentAdapter("Marco Gastos"),null);});}
    }
    private void result(String message){web.evaluateJavascript("window.fileResult("+JSONObject.quote(message)+")",null);}
    @Override protected void onActivityResult(int request,int result,Intent data){super.onActivityResult(request,result,data);
        if(result!=RESULT_OK||data==null){pendingContent=null;result("Operación cancelada.");return;}
        try{
            if(request==SAVE&&pendingContent!=null){try(OutputStream out=getContentResolver().openOutputStream(data.getData())){if(out==null)throw new IOException();out.write(pendingContent.getBytes(StandardCharsets.UTF_8));}pendingContent=null;result("Archivo guardado.");}
            else if(request==OPEN){try(InputStream in=getContentResolver().openInputStream(data.getData());ByteArrayOutputStream out=new ByteArrayOutputStream()){
                if(in==null)throw new IOException();byte[] buffer=new byte[8192];int n;while((n=in.read(buffer))!=-1){if(out.size()+n>5000000)throw new IOException();out.write(buffer,0,n);}String text=out.toString("UTF-8");web.evaluateJavascript("window.receiveBackup("+JSONObject.quote(text)+")",null);
            }}
        }catch(Exception e){pendingContent=null;result("No se pudo leer o guardar el archivo. Límite: 5 MB.");}
    }
    @Override protected void onSaveInstanceState(Bundle state){super.onSaveInstanceState(state);/* El contenido se conserva en memoria mientras el selector está abierto. */}
    @Override public void onBackPressed(){moveTaskToBack(true);}
    @Override protected void onDestroy(){web.removeJavascriptInterface("AndroidFiles");web.destroy();super.onDestroy();}
}
