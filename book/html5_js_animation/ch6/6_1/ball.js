function Ball(radius,color){
    if (radius===undefined){radius=40}
    if (color===undefined){color="#ff0000"}
    this.x=0
    this.y=0
    this.radius=radius
    this.rotation=0
    this.scaleX=1
    this.scaleY=1
    this.color=utils.parseColor(color)
    this.lineWidth=1
}

Ball.prototype.draw=function (context){
    context.save()
    //初始位置
    context.translate(this.x,this.y)
    //设置旋转
    context.rotate(this.rotation)
    //设置缩放
    context.scale(this.scaleX,this.scaleY)
    //设置边框
    context.lineWidth=this.lineWidth
    context.fillStyle=this.color
    context.beginPath()
    //radius默认是40.
    // context.arc(0,0,this.radius,0,Math.PI*2,true)
    context.rect(0,0,100,100)
    context.closePath()
    context.fill()
    if (this.lineWidth>0){
        context.stroke()
    }
    context.restore()
}