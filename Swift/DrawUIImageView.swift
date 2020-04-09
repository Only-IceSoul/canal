//
//  ImageViewCustom.swift
//  testallhere
//
//  Created by Juan J LF on 9/3/19.
//  Copyright © 2019 Juan J LF. All rights reserved.
//

import UIKit

class ImageViewCustom: UIImageView {
        var lineas = [[CGPoint]]()

    
    func renderImage(){
        
        let render = UIGraphicsImageRenderer(size: self.frame.size)
        
        let imagenrenderado = render.image { (context) in
           
            let contextreal = context.cgContext
            contextreal.setStrokeColor(UIColor.red.cgColor)
            contextreal.setLineWidth(10)
            contextreal.setLineCap(.round)
            
            
            lineas.forEach { (linea) in
                for (i, p) in linea.enumerated(){
                    if i == 0{
                        contextreal.move(to: p)
                    }else{
                        contextreal.addLine(to: p)
                    }
                }
            }
            
            contextreal.strokePath()
            
            
        }
        
        self.image = imagenrenderado
        
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
          lineas.append([CGPoint]())
    }
    
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {

        guard let point =  touches.first?.location(in: self)
            else {return}
        
        guard var ultimaLinea = lineas.popLast() else{return}
        
        ultimaLinea.append(point)
        
        lineas.append(ultimaLinea)
        
        
        renderImage()
    }
    
    func undo(){
        
        _ = lineas.popLast()
       renderImage()
    }
    
    func clear(){
        lineas.removeAll()
        renderImage()
    }
    
}
