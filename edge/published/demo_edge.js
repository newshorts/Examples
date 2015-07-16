
(function(compId){var _=null,y=true,n=false,x7='break-word',x8='nowrap',x2='5.0.0',p='px',x5='46',lf='left',x1='5.0.1',g='image',x6='Arial, Helvetica, sans-serif',l='normal',e12='${Text}',x='text',rz='rotateZ',x11='rgba(0,0,0,1.00)',x3='5.0.1.386',x9='rgba(0,0,0,0)',i='none';var g10='microphone-grey.png';var s4="Hello World";var im='images/',aud='media/',vid='media/',js='js/',fonts={},opts={'gAudioPreloadPreference':'auto','gVideoPreloadPreference':'auto'},resources=[],scripts=[],symbols={"stage":{v:x1,mv:x2,b:x3,stf:i,cg:i,rI:n,cn:{dom:[{id:'Text',t:x,r:['-280px','128px','auto','auto','auto','auto'],text:s4,n:[x6,[x5,p],"rgba(255,255,255,1.00)",l,i,"",x7,x8],tf:[[],['360']]},{id:'microphone-grey2',t:g,r:['253px','206px','43px','82px','auto','auto'],cu:'pointer',f:[x9,im+g10,'0px','0px']}],style:{'${Stage}':{isStage:true,r:[undefined,undefined,'550px','309px'],overflow:'hidden',f:[x11]}}},tt:{d:500,a:y,data:[["eid10",lf,0,500,"linear",e12,'-280px','156px'],["eid12",rz,0,500,"linear",e12,'360deg','0deg']]}}};AdobeEdge.registerCompositionDefn(compId,symbols,fonts,scripts,resources,opts);})("EDGE-174933755");
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;Edge.registerEventBinding(compId,function($){
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${microphone-grey2}","click",function(sym,e){$(window).trigger("microphoneClicked");});
//Edge binding end
})("stage");
//Edge symbol end:'stage'
})})(AdobeEdge.$,AdobeEdge,"EDGE-174933755");