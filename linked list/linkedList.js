// node class used to create node
class Node{
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = null
    }
    addNodeAtTop(data){
        let newNode = new Node(data)
        if(!this.head){
            this.head = newNode
        }else{
            newNode.next = this.head
            this.head = newNode
        }
    }
    addNodeAtLast(data){
        let newNode = new Node(data)
        let current = this.head
        while(current.next){
            current = current.next
        }
        current.next = newNode
    }
    printList(){
        let current = this.head
        while(current){
            console.log(current.data)
            current = current.next   
        }
    }
}

const myList = new LinkedList()
myList.printList()
myList.addNodeAtLast(10)
myList.addNodeAtLast(20)
myList.addNodeAtLast(30)
myList.addNodeAtLast(50)
myList.addNodeAtLast(40)
myList.addNodeAtLast(60)
myList.printList()
