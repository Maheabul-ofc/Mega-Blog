import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="bg-slate-700/50 rounded-lg border border-slate-600/50 overflow-hidden">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="xn2sir2ftlwkl6r9wwvfjsauaweb0sh5rv6tqz2jrx8awk4d" 
              initialValue={defaultValue}
              init={{
                height: 400,
                menubar: true,
                skin: 'oxide-dark',
                content_css: 'dark',
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                  'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    font-size: 14px;
                    background-color: #334155;
                    color: #e2e8f0;
                  }
                `,
                branding: false,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}



