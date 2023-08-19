class TreeNode {

    value : number | null = null;
    children: [TreeNode|null, TreeNode|null] | null = null;

    constructor(value: number) {
        this.value = value;
    }
}

export class Tree {

    head : TreeNode
    numNodes = 0
    constructor(value: number) {
        this.head = new TreeNode(value);
        this.numNodes++;
    }

    private _getRelativeHeight(node: TreeNode, level: number) {

        if(node.children === null) {
            return level;
        }
        
        let maxChildHeight = -1;
        for(let child of node.children) {
            if(child === null) {
                continue;
            }
            let childHeight = this._getRelativeHeight(child, level+1);
            if(maxChildHeight < childHeight) {
                maxChildHeight = childHeight;
            }
        }

        return maxChildHeight;
    }

    private _add(node: TreeNode, value: number) {

        if(node.children === null) {
            
            node.children = [null, null];
            node.children[0] = new TreeNode(value);
        } else if (node.children[0] === null){
            node.children[0] = new TreeNode(value);
        } else if(node.children[1] === null) {
            node.children[1] = new TreeNode(value);
        } else {
            let childIndex = Math.floor(Math.random()*10)%2
            this._add(node.children[childIndex]!, value);
        }
        
        /*An approach to do simple balanced Tree,

        let relativeLeftChildHeight = this._getRelativeHeight(node.children[0]!, 0);
        let relativeRightChildHeight = this._getRelativeHeight(node.children[1]!, 0);

        if(relativeLeftChildHeight > relativeRightChildHeight) {
            this._add(node.children[1]!, value);
        } else {
            this._add(node.children[0]!, value);
        }*/
        return;

    }

    add(value: number) {
        this._add(this.head, value);
        this.numNodes++;
    }

    public printTree() {

        let queue: TreeNode[] = [];
        let tempQueue: TreeNode[] = [];
        let currentNode: TreeNode | undefined;
        let level = 0;

        function spaceCreator(space: number) {

            let finalSpace = "";
            for(let i=0; i<space; i++) {
                finalSpace = finalSpace + " ";
            }
            return finalSpace;
        }

        queue.push(this.head);
        while(true) {

            currentNode = tempQueue[0];

            if(tempQueue.length > 0 && currentNode) {
                if(currentNode.children === null) {
                    tempQueue = tempQueue.slice(1);
                    continue;
                }
        
                for(let child of currentNode.children) {
                    if(child !== null) {
                        queue.push(child);
                    }
                }

                tempQueue = tempQueue.slice(1); 

            } else if (tempQueue.length === 0) {

                if(queue.length === 0) {
                    break;
                }

                for(let entry of queue) {
                    tempQueue.push(entry);
                }
                queue = [];
                
                //printing logic
                
                let space = Math.floor((this.numNodes+1) / 2**level);
                let printedString = "";
                for(let i = 0; i<tempQueue.length; i++) {
                    if(i%2 === 0) {
                        printedString = printedString + spaceCreator(space) + tempQueue[i].value;
                    } else if(i%2 === 1) {
                        printedString = printedString + spaceCreator(2*space) + tempQueue[i].value;
                    } else {
                        throw "wrong state";
                    }
                }

                console.log(printedString);
                level++;
            }          
        }

    }
}