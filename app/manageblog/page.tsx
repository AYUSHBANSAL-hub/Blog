"use client"

import React, { useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { UploadCloud, ArrowRight, Eye } from "lucide-react"
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })
import "react-quill-new/dist/quill.snow.css"

import { useAppSelector } from "@/lib/hook"

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"]
    ],
    handlers: {
      image: async function (this: any) {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.click()

        input.onchange = async () => {
          const file = input.files?.[0]
          if (!file) return

          const fd = new FormData()
          fd.append("image", file)

          const res = await fetch("/api/upload-image", { method: "POST", body: fd })
          if (!res.ok) return alert("Upload failed")

          const { url } = await res.json()
          const range = this.quill.getSelection(true)
          this.quill.insertEmbed(range.index, "image", url)
          this.quill.setSelection(range.index + 1)
        }
      }
    }
  }
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
  "image"
]

const BlogEditorBody: React.FC = () => {
  const router = useRouter()
  const { email } = useAppSelector((s) => s.user) || {}

  const [title, setTitle] = useState("")
  const [subheading, setSubheading] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file?.type.startsWith("image/")) {
      setFeaturedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const addTag = () => {
    const t = currentTag.trim()
    if (t && !tags.includes(t)) {
      setTags([...tags, t])
      setCurrentTag("")
    }
  }

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t))

  const handlePreview = () => {
    if (!title.trim() && !content.trim()) {
      alert("Nothing to preview.")
      return
    }
    setShowPreview(true)
  }

  const handlePublish = async () => {
    if (!email) {
      alert("You must be logged in.")
      return
    }
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.")
      return
    }

    const fd = new FormData()
    fd.append("title", title)
    fd.append("subHeading", subheading)
    fd.append("content", content)
    fd.append("email", email)
    fd.append("tags", JSON.stringify(tags))
    fd.append("category", category)
    fd.append("subCategory", subCategory)
    if (featuredImage) fd.append("coverImage", featuredImage)

    try {
      setIsPublishing(true)
      const res = await fetch("/api/blogs", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to publish")
      alert("Blog published 🎉")
      router.push(`/blog-open?blogId=${data.blog.blog_id}`)
    } catch (err: any) {
      alert(err.message || "Server error")
    } finally {
      setIsPublishing(false)
    }
  }

  const canPublish = Boolean(
    email &&
    title.trim() &&
    content.trim() &&
    category &&
    subCategory &&
    featuredImage
  );


  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 mt-[50px] sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-x-8">

          {/* Editor column */}
          <div className="w-full lg:flex-[2_1_0%] flex flex-col gap-y-3 mb-8 lg:mb-0">
            <input
              placeholder="Enter your blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-[30px] text-black font-bold border-none shadow-none focus-visible:ring-0"
            />

            <input
              placeholder="Enter your sub heading..."
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="text-[24px] font-[600] text-black border-none shadow-none focus-visible:ring-0"
            />

            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-[#111827] mb-2">Featured Image</h3>
              <div
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
                onClick={() => imageInputRef.current?.click()}
                className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer"
              >
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-full object-contain rounded" />
                ) : (
                  <div className="text-center">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Click or drag image</p>
                  </div>
                )}
              </div>
            </div>

            <div className="min-h-[300px] bg-white border rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Start writing your blog post…"
                className="h-full"
                style={{ height: "100%" }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 lg:max-w-xs flex flex-col gap-y-6 lg:sticky lg:top-20 self-start">
            <div className="bg-white rounded-lg shadow border p-4 flex flex-col gap-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Sub‑Category</label>
                <Select value={subCategory} onValueChange={setSubCategory}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select sub‑category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="ui-ux">UI/UX</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (Optional)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm">Add</Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 text-blue-500">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handlePreview}
              variant="outline"
              className="w-full rounded-full py-6 font-bold flex items-center justify-center gap-2"
            >
              <Eye size={18} /> Preview
            </Button>

            <Button
              onClick={handlePublish}
              disabled={!canPublish || isPublishing}
              className="w-full rounded-full bg-blue-500 hover:bg-blue-600 text-white py-6 font-bold disabled:opacity-50"
            >
              {isPublishing ? "Publishing…" : "Publish"} <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto invisible-scrollbar">
            {title && <h1 className="text-3xl font-bold">{title}</h1>}
            {subheading && <h2 className="text-xl font-semibold">{subheading}</h2>}
            {imagePreview && (
              <img src={imagePreview} alt="cover" className="w-full h-auto rounded" />
            )}
            {content && (
              <div
                className="prose prose-sm sm:prose lg:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BlogEditorBody
