class Graph{
    constructor(name){
        this.nodes = [];
        this.name = name;
    }
    addNode(node){
        this.nodes.push(node);
    }
    addEdge(node1, node2){
        node1.neighbors.push(node2); 
        node2.neighbors.push(node1);
    }
}

let selectedNode;
let selectedGraph;
graph1 = new Graph("graph1");
graph2 = new Graph("graph2");
selectedGraph = graph1;
let isoMap = new Map();
let xStepperMap = new Map();
let yStepperMap = new Map();
document.getElementById("morphButton").disabled = true;

class Node{
    constructor(x, y){
        if(selectedGraph.nodes == undefined)
        this.val = 0;
        else 
        this.val = selectedGraph.nodes.length
        this.xCoord = x;
        this.yCoord = y;
        this.neighbors = [];
    }
}

function createNode(event) {
    const x = event.layerX;
    const y = event.layerY;
    //Check for closeness
    for(let i = 0; i < selectedGraph.nodes.length; i++){
        if(Math.abs(selectedGraph.nodes[i].xCoord - x) <= 10){
            if(Math.abs(selectedGraph.nodes[i].yCoord - y) <= 10){
                return;
            }
        }
    }
    //Creating Node
    node= new Node(event.layerX, event.layerY);
    selectedGraph.addNode(node);
    drawNode(event);
}

function select(event){
    const x = event.layerX;
    const y = event.layerY;
    //Check for closeness
    for(let i = 0; i < selectedGraph.nodes.length; i++){
        //If close, select
        if(Math.abs(selectedGraph.nodes[i].xCoord - x) <= 10){
            if(Math.abs(selectedGraph.nodes[i].yCoord - y) <= 10){
                let newNode = selectedGraph.nodes[i];
                if(selectedNode == null){
                    selectedNode = newNode;
                    selectAnimation(selectedNode);
                    return;
                }
                else{
                    //If selected and close to another, add edge
                    if(selectedNode != newNode){
                        let alreadyInList = false
                        for(let j = 0; j < selectedNode.neighbors.length; j++){
                            if(selectedNode.neighbors[j] == newNode)
                                alreadyInList = true;
                        }
                        if(!alreadyInList){
                            (selectedGraph.addEdge(selectedNode, newNode));
                            drawEdge(selectedNode, newNode);
                        }
                    }
                    deselect(selectedNode);
                    selectedNode = null;
                    return;
                }
            }
        }
    }
    if(selectedNode != null){
        deselect(selectedNode);
        selectedNode = null;
    }
}

function deleteNode(event){
    console.log("before");
    for(let i = 0; i < selectedGraph.nodes.length; i++){
        console.log(selectedGraph.nodes[i].neighbors);
    }
    if(event.keyCode != 8)
        return;
    if(selectedNode == null)
        return;
    
    //Delete Edges
    for(let i = 0; i < selectedNode.neighbors.length; i++){
         let neighborInd = selectedGraph.nodes.indexOf(selectedNode.neighbors[i]);
         let neighbor = selectedGraph.nodes[neighborInd];
         let delIndex = neighbor.neighbors.indexOf(selectedNode);
         unDrawEdge(selectedNode, neighbor);
         neighbor.neighbors.splice(delIndex, 1);
     }

    //Delete Node From Graph
    let selIndex = selectedGraph.nodes.indexOf(selectedNode);
    selectedGraph.nodes.splice(selIndex, 1);
    unDrawNode(selectedNode);

    selectedNode = null;
}

function isIsomorphic(){
    if(graph1 == null || graph2 == null){
        return false;
    }
    G1List = graph1.nodes.map((x) => x);
    G2List = graph2.nodes.map((x) => x);
    if(G1List.length != G2List.length){
        return false;
    }
    for(let i = 0; i < G1List.length; i++){
        found = false;
        for(let j = 0; j < G2List.length; j++){
            if(G1List[i].neighbors.length == G2List[j].neighbors.length){
                isoMap.set(G1List[i], G2List[j]);
                const xStep = (G2List[j].xCoord-G1List[i].xCoord)/500;
                const yStep = (G2List[j].yCoord-G1List[i].yCoord)/500;
                xStepperMap.set(G1List[i], xStep);
                yStepperMap.set(G1List[i], yStep);
                G2List.splice(j, 1);
                found = true;
            }
            if(found)
                break;
        }
    }
    if(G2List.length == 0){
        document.getElementById("switchButton").disabled = true;
        document.getElementById("morphButton").disabled = false;
        document.getElementById("isoButton").disabled = true;
        return true;
    }
    else {
        return false;
    }
}

function switchGraph(){
    if(selectedGraph == graph1)
        selectedGraph = graph2;
    else if(selectedGraph == graph2)
        selectedGraph = graph1;
}

function reset(){
    graph1 = new Graph();
    graph2 = new Graph();
    selectedGraph = graph1;
    let canvas = document.getElementById('circle');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        ctx.clearRect(0,0,1200, 500);
    }
    document.getElementById("isoButton").disabled = false;
    document.getElementById("switchButton").disabled = false;
    document.getElementById("morphButton").disabled = true;
}

function morph(){
    document.getElementById("switchButton").disabled = true;
    document.getElementById("isoButton").disabled = false;
    isoAnim();
}

//TO HIGHLIGHT 
document.getElementById("circle").addEventListener("click", select, true);

//TO SWITCH GRAPHS
document.getElementById("switchButton").addEventListener("click", switchGraph, true);

//TO DELETE
window.addEventListener("keydown", deleteNode, true);

//TO CREATE NEW NODE
document.getElementById("circle").addEventListener("dblclick", createNode, true);

//TO CHECK ISOMORPHISM
document.getElementById("isoButton").addEventListener("click", isIsomorphic, true);

//TO RESET GRAPH 
document.getElementById("resetButton").addEventListener("click", reset, true);

//TO MORPH 
document.getElementById("morphButton").addEventListener("click", morph, true);