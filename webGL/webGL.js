/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function WebGL(CID, FSID, VSID){
    var canvas = document.getElementById(CID);
    if(!canvas.getContext("webgl") && !canvas.getContext("experimental-webgl"))
        alert("Your Browser Doesn't Support WebGL");
    else
    {
        this.GL = (canvas.getContext("webgl")) ? canvas.getContext("webgl") : canvas.getContext("experimental-webgl");  
         
        this.GL.clearColor(1.0, 1.0, 1.0, 1.0); // this is the color 
        this.GL.enable(this.GL.DEPTH_TEST); //Enable Depth Testing
        this.GL.depthFunc(this.GL.LEQUAL); //Set Perspective View
        this.AspectRatio = canvas.width / canvas.height;
         
        var FShader = document.getElementById(FSID);
        var VShader = document.getElementById(VSID);

        if(!FShader || !VShader)
            alert("Error, Could Not Find Shaders");
        else
        {
            //Load and Compile Fragment Shader
            var Code = LoadShader(FShader);
            FShader = this.GL.createShader(this.GL.FRAGMENT_SHADER);
            this.GL.shaderSource(FShader, Code);
            this.GL.compileShader(FShader);

            //Load and Compile Vertex Shader
            Code = LoadShader(VShader);
            VShader = this.GL.createShader(this.GL.VERTEX_SHADER);
            this.GL.shaderSource(VShader, Code);
            this.GL.compileShader(VShader);

            //Create The Shader Program
            this.ShaderProgram = this.GL.createProgram();
            this.GL.attachShader(this.ShaderProgram, FShader);
            this.GL.attachShader(this.ShaderProgram, VShader);
            this.GL.linkProgram(this.ShaderProgram);
            this.GL.useProgram(this.ShaderProgram);

            //Link Vertex Position Attribute from Shader
            this.VertexPosition = this.GL.getAttribLocation(this.ShaderProgram, "VertexPosition");
            this.GL.enableVertexAttribArray(this.VertexPosition);

            //Link Texture Coordinate Attribute from Shader
            this.VertexTexture = this.GL.getAttribLocation(this.ShaderProgram, "TextureCoord");
            this.GL.enableVertexAttribArray(this.VertexTexture);
        }
    }
}

function LoadShader(Script){
    var Code = "";
    var CurrentChild = Script.firstChild;
    while(CurrentChild)
    {
        if(CurrentChild.nodeType == CurrentChild.TEXT_NODE)
            Code += CurrentChild.textContent;
        CurrentChild = CurrentChild.nextSibling;
    }
    return Code;
}