//
//  ImagePicker.swift
//  Campus
//
//  Created by Rolando Rodriguez on 10/28/19.
//  Copyright © 2019 Rolando Rodriguez. All rights reserved.
//

import Foundation
import SwiftUI

struct ImagePicker: UIViewControllerRepresentable {

    var allowsEditing: Bool
    var onImageSelection: (UIImage) -> ()
    var dismiss: () -> ()

    func makeCoordinator() -> Coordinator {
        return Coordinator(allowsEditing: self.allowsEditing, dismiss: dismiss, onImageSelection: onImageSelection)
    }

    func makeUIViewController(context: UIViewControllerRepresentableContext<ImagePicker>) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.allowsEditing = self.allowsEditing
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController,
                                context: UIViewControllerRepresentableContext<ImagePicker>) {

    }
    
    class Coordinator: NSObject, UINavigationControllerDelegate, UIImagePickerControllerDelegate {

        let dismiss: () -> ()
        let onImageSelection: (UIImage) -> ()
        let allowsEditing: Bool
        
        init(allowsEditing: Bool, dismiss: @escaping () -> (), onImageSelection: @escaping (UIImage) -> ()) {
            self.onImageSelection = onImageSelection
            self.allowsEditing = allowsEditing
            self.dismiss = dismiss
        }

        func imagePickerController(_ picker: UIImagePickerController,
                                   didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            let image = info[self.allowsEditing ?  UIImagePickerController.InfoKey.editedImage : UIImagePickerController.InfoKey.originalImage] as! UIImage
            self.onImageSelection(image)
            self.dismiss()
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            self.dismiss()
        }
    }
}
