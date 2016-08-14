package com.sen.chess;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * 树的实现
 * @author zhangsen
 *
 */


public class Tree<T> {
	
	private int count;
	private List<Node<T>> nodes;

	public Tree() {
		this.nodes = new ArrayList<Node<T>>();
		this.count = 0;
	}

	public Tree(Node<T> root) {
		this.nodes = new ArrayList<Node<T>>();
		this.count = 1;
		this.nodes.add(0, root);
	}

	/**
	 *  将一个节点添加到指定父节点下
	 * @param node
	 * @param parent
	 */
	public void add(Node<T> node, Node<T> parent) {
		node.setParent(this.position(parent));
		nodes.add(node);
		this.count++;
	}

	/**
	 *  获取节点的存储位置，即索引
	 * @param node
	 * @return
	 */
	public int position(Node<T> node) {
		for (int i = 0; i < this.nodes.size(); i++) {
			if (this.nodes.get(i)!=null &&
					this.nodes.get(i).getData().toString()
					.equals(node.getData().toString())) {
				return i;
			}
		}
		return -1;
	}

	/**
	 *  获取全部节点数
	 * @return
	 */
	public int getSize() {
		return this.count;
	}

	/**
	 *  获取根节点
	 * @return
	 */
	public Node<T> getRoot() {
		return this.nodes.get(0);
	}
	
	/**
	 * 获取所有有效节点，以List形式返回  
	 * @return
	 */
    public List<Node<T>> getAllNodes(){  
        List<Node<T>> list = new ArrayList<Node<T>>();  
        for(int i=0;i<nodes.size();i++){  
            if(nodes.get(i) != null){  
                list.add(nodes.get(i));  
            }
        }
        return list;
    }
    
    /**
     * 通过父节点查找子节点
     * @return
     */
    public List<Node<T>> getNodesByParent(Node<T> parent,List<Node<T>> list){
        int index = this.position(parent);				//获取父节点的索引
    	for(int i=0;i<nodes.size();i++){
    		if(nodes.get(i)!=null && 
    				nodes.get(i).getParent()==index){	//遍历的节点是当前节点的子节点
    			list.add(nodes.get(i));					//添加当前子节点
    			getNodesByParent(nodes.get(i), list);	//遍历当前子节点的子节点
    		}
    	}
    	
    	return list;
    }
    
    
    /**
     * 获取树的深度，只有根节点的时候为1  
     * @return
     */
    public int getDepth(){  
        int max = 1;  
        if(this.nodes.get(0) == null){  
            return 0;  
        }        
        for(int i=0;i<this.count;i++){  
            int deep = 1;  
            int location = this.nodes.get(i)==null ? -1 : this.nodes.get(i).getParent();  
            while(location != -1 && this.nodes.get(location) != null){  
                location = ((Node<T>)(this.nodes.get(location))).getParent();  
                deep++;  
            }  
            if(max < deep){  
                max = deep;  
            }  
        }
        return max;
    } 
    
    /**
     * 删除节点
     */
    public void delete(Node<T> node){
    	int index = this.position(node);				//获取要删除节点的索引
    	for(int i=0;i<nodes.size();i++){
    		if(nodes.get(i)!=null && 
    				nodes.get(i).getParent()==index){	//遍历的节点是当前节点的子节点
    			delete(nodes.get(i));					//递归删除子节点
    			nodes.set(i, null);						//删除当前节点
    			this.count--;
    		}
    	}
    }

    /**
     * 获取所有节点集合
     * @return
     */
	public List<Node<T>> getNodes() {
		return nodes;
	}
    
}
