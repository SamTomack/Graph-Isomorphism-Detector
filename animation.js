function drawNode(event){
    var canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        var X = event.layerX;
        var Y = event.layerY;
        var R = 0;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(R == 8){
                clearInterval(id);
                return;
            }
            else{
                ctx.clearRect(X, Y, 20, 20);
                ctx.beginPath();    
                if(selectedGraph == graph1)
                    ctx.fillStyle = '#42f5bc';
                else if(selectedGraph == graph2)
                    ctx.fillStyle = '#ff4a68';
                ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
                ctx.fill();
                R += 1;
            }
        }
    }
}

function drawEdge(node1, node2){
    canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        ctx.lineWidth = 1;
        var count = 0;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(count == 5){
                return;
            }
            else{
                ctx.strokeStyle = 'rgba(0,0,0,.3)';
                ctx.beginPath();
                ctx.moveTo(node1.xCoord, node1.yCoord);
                ctx.lineTo(node2.xCoord, node2.yCoord); //Fuck dealing with angles 
                ctx.stroke();
                //Node1 is deselected, so redrawn. Node2 needs to be redrawn. 
                ctx.clearRect(node2.xCoord-10, node2.yCoord-10, 20, 20);
                ctx.beginPath();
                if(selectedGraph == graph1)
                    ctx.fillStyle = '#42f5bc';
                else if(selectedGraph == graph2)
                    ctx.fillStyle = '#ff4a68';
                ctx.arc(node2.xCoord, node2.yCoord, 8, 0, 2 * Math.PI, false);
                ctx.fill();
                count+=1;
            }
        }
    }
}

function deselect(selectedNode){
    canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        var count = 0;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(count == 5){
                ctx.clearRect(selectedNode.xCoord-10, selectedNode.yCoord-10, 20, 20);
                ctx.beginPath();
                if(selectedGraph == graph1)
                    ctx.fillStyle = '#42f5bc';
                else if(selectedGraph == graph2)
                    ctx.fillStyle = '#ff4a68';
                ctx.arc(selectedNode.xCoord, selectedNode.yCoord, 8, 0, 2 * Math.PI, false);
                ctx.fill();
                clearInterval(id);
                return;
            }
            else{
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255,255,255,.1)';
                ctx.arc(selectedNode.xCoord, selectedNode.yCoord, 8, 0, 2 * Math.PI, false);
                ctx.stroke();
                count += 1;
            }
        }
    }
}

function unDrawNode(selectedNode){
    canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        var R = 8;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(R == 0){
                ctx.clearRect(selectedNode.xCoord-10, selectedNode.yCoord-10, 20, 20);
                clearInterval(id);
                return;
            }
            else{
                console.log("ran");
                ctx.clearRect(selectedNode.xCoord-10, selectedNode.yCoord-10, 20, 20);
                ctx.beginPath();
                if(selectedGraph == graph1)
                    ctx.fillStyle = '#42f5bc';
                else if(selectedGraph == graph2)
                    ctx.fillStyle = '#ff4a68';
                ctx.arc(selectedNode.xCoord, selectedNode.yCoord, R, 0, 2 * Math.PI, false);
                ctx.fill();
                R -= 1;
            }
        }
    }
}

function unDrawEdge(node1, node2){
    canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        ctx.lineWidth = 1;
        var count = 0;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(count == 5){
                return;
            }
            else{
                ctx.strokeStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(node1.xCoord, node1.yCoord);
                ctx.lineTo(node2.xCoord, node2.yCoord); //Fuck dealing with angles 
                ctx.stroke();
                //Node1 is deselected, so redrawn. Node2 needs to be redrawn. 
                ctx.clearRect(node2.xCoord-10, node2.yCoord-10, 20, 20);
                ctx.beginPath();
                if(selectedGraph == graph1)
                    ctx.fillStyle = '#42f5bc';
                else if(selectedGraph == graph2)
                    ctx.fillStyle = '#ff4a68';
                ctx.arc(node2.xCoord, node2.yCoord, 8, 0, 2 * Math.PI, false);
                ctx.fill();
                count+=1;
            }
        }
    }
} 

function selectAnimation(selectedNode){
    canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        var count = 0;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(count == 5){
                ctx.clearRect(selectedNode.xCoord-10, selectedNode.yCoord-10, 20, 20);
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                if(selectedGraph == graph1)
                    ctx.fillStyle = '#42f5bc';
                else if(selectedGraph == graph2)
                    ctx.fillStyle = '#ff4a68';
                ctx.arc(selectedNode.xCoord, selectedNode.yCoord, 8, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.stroke();
                clearInterval(id);
                return;
            }
            else{
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,0,0,.01)';
                ctx.arc(selectedNode.xCoord, selectedNode.yCoord, 8, 0, 2 * Math.PI, false);
                ctx.stroke();
                count += 1;
            }
        }
    }
}

function isoAnim(){
    canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        var count = 0;
        let id = null
        clearInterval(id);
        id = setInterval(animate, 5);
        function animate(){
            if(count == 501){
                return;
            }
            else{
                ctx.clearRect(0, 0, 1200, 500);
                for(let i = 0; i < graph1.nodes.length; i++){
                    for(let j = 0; j < graph1.nodes[i].neighbors.length; j++){
                        ctx.strokeStyle = 'black';
                        ctx.beginPath();
                        ctx.moveTo(graph1.nodes[i].xCoord, graph1.nodes[i].yCoord);
                        ctx.lineTo(graph1.nodes[i].neighbors[j].xCoord, graph1.nodes[i].neighbors[j].yCoord); //Fuck dealing with angles 
                        ctx.stroke();
                    }
                    ctx.beginPath();    
                    ctx.fillStyle = '#42f5bc';
                    ctx.arc(graph1.nodes[i].xCoord, graph1.nodes[i].yCoord, 8, 0, 2 * Math.PI, false);
                    ctx.fill();
                    graph1.nodes[i].xCoord = graph1.nodes[i].xCoord+xStepperMap.get(graph1.nodes[i]);
                    graph1.nodes[i].yCoord = graph1.nodes[i].yCoord+yStepperMap.get(graph1.nodes[i]);
                }

                for(let i = 0; i < graph2.nodes.length; i++){
                    for(let j = 0; j < graph2.nodes[i].neighbors.length; j++){
                        ctx.strokeStyle = 'black';
                        ctx.beginPath();
                        ctx.moveTo(graph2.nodes[i].xCoord, graph2.nodes[i].yCoord);
                        ctx.lineTo(graph2.nodes[i].neighbors[j].xCoord, graph2.nodes[i].neighbors[j].yCoord); //Fuck dealing with angles 
                        ctx.stroke();
                    }
                    ctx.beginPath();    
                    ctx.fillStyle = '#ff4a68';
                    ctx.arc(graph2.nodes[i].xCoord, graph2.nodes[i].yCoord, 8, 0, 2 * Math.PI, false);
                    ctx.fill();
                }
                count += 1;
            }
            
        }
    } 
}