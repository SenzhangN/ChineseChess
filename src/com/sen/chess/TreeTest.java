package com.sen.chess;

import java.util.ArrayList;
import java.util.List;

/**
 * 测试树的类
 * @author zhangsen
 */


public class TreeTest {
	public static void main(String[] args){  
        Node<String> root = new Node<String>("A",-1);  
        Tree<String> tree = new Tree<String>(root);  
        Node<String> b = new Node<String>("B");  
        Node<String> c = new Node<String>("C");  
        Node<String> d = new Node<String>("D");  
        Node<String> e = new Node<String>("E");  
        Node<String> f = new Node<String>("F");  
        Node<String> g = new Node<String>("G");  
        Node<String> h = new Node<String>("H");  
        Node<String> i = new Node<String>("I");  
        Node<String> j = new Node<String>("J");  
        tree.add(b,root);  
        tree.add(c,root);  
        tree.add(d,root);  
        
        tree.add(e,b);  
        tree.add(f,b);  
        tree.add(g,f);  
        tree.add(h, g);
        tree.add(i, g);
        tree.add(j, g);
        System.out.println("Tree Size is : "+tree.getSize());  
        System.out.println("Tree root Node is : "+tree.getRoot().getData());  
        System.out.println("Tree All nodes : "); 
        List<Node<String>> allNodes = tree.getAllNodes();
        for(Node<String> n : allNodes){
        	int parentNodeIndex = n.getParent();
        	String parentNode = "Null";
        	if(parentNodeIndex!=-1 && allNodes.get(parentNodeIndex)!=null){
        		parentNode = allNodes.get(parentNodeIndex).getData();        				
        		System.out.println("{ "+n.getData()+": parentNode is "+parentNode+" ,this node index "+tree.position(n)+" } ");
        	}        
        	if(parentNodeIndex==-1){
        		System.out.println("{ "+n.getData()+": this is Root Node ,this node index "+tree.position(n)+" } ");
        	}
        }
        System.out.println("Tree deep is : "+tree.getDepth());  
        System.out.println("-----------------------------------------------------");
        System.out.println("Get all Children of Node B : ");
        //查找B节点下的所有子节点
        Node<String> bnode = new Node<String>();
        bnode.setData("B");
        bnode.setParent(0);
        allNodes = tree.getNodes();
        List<Node<String>> ChildNodes = new ArrayList<Node<String>>();
        ChildNodes = tree.getNodesByParent(bnode,ChildNodes);
        for(Node<String> n : ChildNodes){
        	int parentNodeIndex = n.getParent();
        	String parentNode = "Null";
        	if(parentNodeIndex!=-1 && allNodes.get(parentNodeIndex)!=null){
        		parentNode = allNodes.get(parentNodeIndex).getData();        				
        		System.out.println("{ "+n.getData()+": parentNode is "+parentNode+" ,this node index "+tree.position(n)+" } ");
        	}
        	if(parentNodeIndex==-1){
        		System.out.println("{ "+n.getData()+": this is Root Node ,this node index "+tree.position(n)+" } ");
        	}
        }
        System.out.println("-----------------------------------------------------");
        System.out.println("after delete Node B : ");
        //删除
        tree.delete(bnode);
        allNodes = tree.getAllNodes();
        for(Node<String> n : allNodes){
        	int parentNodeIndex = n.getParent();
        	String parentNode = "Null";
        	if(parentNodeIndex!=-1 && allNodes.get(parentNodeIndex)!=null){
        		parentNode = allNodes.get(parentNodeIndex).getData();        				
        		System.out.println("{ "+n.getData()+": parentNode is "+parentNode+" ,this node index "+tree.position(n)+" } ");
        	}
        	if(parentNodeIndex==-1){
        		System.out.println("{ "+n.getData()+": this is Root Node ,this node index "+tree.position(n)+" } ");
        	}
        }
        System.out.println("Tree deep is : "+tree.getDepth());  
        System.out.println("Tree Size is : "+tree.getSize());  
        System.out.println("-----------------------------------------------------");
    }  
}
