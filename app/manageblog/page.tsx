"use client"

import type React from "react"
import dynamic from 'next/dynamic';
import { useState, useCallback, useMemo, useRef } from "react"
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Video,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  UploadCloud,
  X,
  MoreHorizontal,
  ArrowRight
} from "lucide-react"

// Define the props for the component
interface BlogEditorBodyProps {
  initialData?: {
    title?: string
    subheading?: string
    content?: string
    featuredImage?: string | null
    category?: string
    subCategory?: string
    tags?: string[]
  }
  onPublish?: (data: any) => void
  onPreview?: (data: any) => void
}

// Define a type for the editor content for clarity
type EditorContent = string

const BlogEditorBody: React.FC<BlogEditorBodyProps> = ({ initialData = {}, onPublish, onPreview }) => {
  const [title, setTitle] = useState(initialData.title || "")
  const [subheading, setSubheading] = useState(initialData.subheading || "")
  const [content, setContent] = useState<EditorContent>(initialData.content || "")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.featuredImage || null)
  const [category, setCategory] = useState(initialData.category || "")
  const [subCategory, setSubCategory] = useState(initialData.subCategory || "")
  const [tags, setTags] = useState<string[]>(initialData.tags || [])
  const [currentTag, setCurrentTag] = useState("")

  const quillRef = useRef<any>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null);


  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setFeaturedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }, [])

  const handleImageDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        setFeaturedImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handlePublish = () => {
    const data = { title, subheading, content, featuredImage, category, subCategory, tags }
    console.log("Publishing data:", data)
    if (onPublish) onPublish(data)
  }

  const handlePreview = () => {
    const data = { title, subheading, content, featuredImage, category, subCategory, tags }
    console.log("Previewing data:", data)
    if (onPreview) onPreview(data)
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
      },
      clipboard: { matchVisual: false },
    }),
    [],
  )

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ]

  const ToolbarButton = ({ format, icon, value }: { format?: string; icon: React.ReactNode; value?: any }) => (
    <button
      type="button"
      className={`ql-${format} p-1.5 flex items-center justify-center hover:bg-gray-100 rounded-md`}
      value={value}
      aria-label={format || "toolbar button"}
    >
      {icon}
    </button>
  )

  return (
    // Responsive outermost container
    <div className="w-full max-w-7xl mx-auto px-4 mt-[50px] sm:px-6 lg:px-8 py-8">
      {/* Main content wrapper: flex for columns, stacks on smaller screens */}
      <div className="flex flex-col lg:flex-row lg:gap-x-8">
        {/* Left Column: Editor Fields - Takes more space on large screens */}
        <div className="w-full lg:flex-[2_1_0%] flex flex-col gap-y-3 mb-8 lg:mb-0">
          <Input
            type="text"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-auto text-2xl md:text-3xl font-bold font-['Figtree'] shadow-none placeholder:text-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            style={{ lineHeight: "1.25" }} // Adjusted line height for responsiveness
          />
          <Input
            type="text"
            placeholder="Enter your Sub heading..."
            value={subheading}
            onChange={(e) => setSubheading(e.target.value)}
            className="h-auto text-xl md:text-2xl font-medium font-['Figtree'] shadow-none placeholder:text-[#ADAEBC] border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            style={{ lineHeight: "1.25" }} // Adjusted line height
          />
          <div className="bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-gray-200 p-4 sm:p-6">
            <h3 className="text-gray-900 text-base sm:text-lg font-semibold font-['Figtree'] mb-4">Featured Image</h3>
            <div
              onDrop={handleImageDrop}
              onDragOver={handleDragOver}
              className="w-full h-40 sm:h-36 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-500"
              onClick={() => imageInputRef.current?.click()}
            >
              <input
                ref={imageInputRef}
                type="file"
                id="featuredImageInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Featured preview"
                  className="max-h-full max-w-full object-contain rounded-md"
                />
              ) : (
                <>
                  <UploadCloud className="w-8 h-6 sm:w-9 sm:h-7 text-gray-400 mb-2" />
                  <p className="text-gray-600 text-xs sm:text-lg/4 w-50  font-normal font-['Figtree']">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-500 mt-2 text-[10px] sm:text-xs font-normal font-['Figtree']">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>

          </div>
          <div
            id="toolbar"
            className="w-full h-auto p-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-gray-200 flex items-center flex-wrap gap-x-1 gap-y-1"
          >
            <div className="flex border-r border-gray-200 pr-1 flex-wrap">
              <ToolbarButton format="bold" icon={<Bold size={16} className="text-gray-600" />} />
              <ToolbarButton format="italic" icon={<Italic size={16} className="text-gray-600" />} />
              <ToolbarButton format="underline" icon={<Underline size={16} className="text-gray-600" />} />
              <ToolbarButton format="strike" icon={<Strikethrough size={16} className="text-gray-600" />} />
            </div>
            <div className="border-r border-gray-200 px-1 flex-wrap">
              <select className="ql-header h-8 text-gray-600 text-xs sm:text-sm font-normal font-['Figtree'] bg-transparent border-none focus:ring-0 focus:outline-none rounded-md hover:bg-gray-100 p-1">
                <option value="">Normal</option> <option value="1">Heading 1</option>{" "}
                <option value="2">Heading 2</option> <option value="3">Heading 3</option>
              </select>
            </div>
            <div className="flex border-r border-gray-200 px-1 flex-wrap">
              <ToolbarButton format="align" value="" icon={<AlignLeft size={16} className="text-gray-600" />} />
              <ToolbarButton format="align" value="center" icon={<AlignCenter size={16} className="text-gray-600" />} />
              <ToolbarButton format="align" value="right" icon={<AlignRight size={16} className="text-gray-600" />} />
            </div>
            <div className="flex border-r border-gray-200 px-1 flex-wrap">
              <ToolbarButton format="list" value="ordered" icon={<ListOrdered size={16} className="text-gray-600" />} />
              <ToolbarButton format="list" value="bullet" icon={<List size={16} className="text-gray-600" />} />
              <ToolbarButton format="blockquote" icon={<Quote size={16} className="text-gray-600" />} />
            </div>
            <div className="flex px-1 flex-wrap">
              <ToolbarButton format="link" icon={<Link2 size={16} className="text-gray-600" />} />
              <ToolbarButton format="image" icon={<ImageIcon size={16} className="text-gray-600" />} />
              <ToolbarButton format="video" icon={<Video size={16} className="text-gray-600" />} />
              <ToolbarButton icon={<MoreHorizontal size={16} className="text-gray-600" />} />
            </div>
          </div>
          <div className="w-full min-h-[300px] md:min-h-[400px] lg:h-[550px] bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Start writing your blog post..."
              className="h-full [&_.ql-container]:border-none [&_.ql-editor]:min-h-[inherit] [&_.ql-editor]:font-['Figtree'] [&_.ql-editor]:text-sm [&_.ql-editor]:md:text-base [&_.ql-editor]:text-gray-700 [&_.ql-editor.ql-blank::before]:text-gray-400 [&_.ql-editor.ql-blank::before]:font-normal [&_.ql-editor.ql-blank::before]:not-italic"
              style={{ height: "calc(100% - 42px)" }}
            />
          </div>
        </div>

        {/* Right Column: Sidebar - Takes less space, sticky on large screens */}
        <div className="w-full lg:w-80 lg:flex-[1_1_0%] lg:max-w-xs flex flex-col gap-y-6 lg:sticky lg:top-20 self-start">
          <div className="bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-gray-200 p-4 sm:p-6 flex flex-col gap-y-6">
            <h3 className="text-gray-900 text-base sm:text-lg font-semibold font-['Figtree']">Categories & Tags</h3>
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium font-['Figtree'] mb-1">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full font-['Figtree'] text-xs sm:text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium font-['Figtree'] mb-1">
                Sub-Category
              </label>
              <Select value={subCategory} onValueChange={setSubCategory}>
                <SelectTrigger className="w-full font-['Figtree'] text-xs sm:text-sm">
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="ui-ux">UI/UX</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium font-['Figtree'] mb-1">Tags</label>
              <div className="flex gap-x-2">
                <Input
                  type="text"
                  placeholder="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="font-['Figtree'] text-xs sm:text-sm"
                />
                <Button onClick={addTag} className="font-['Figtree'] text-xs sm:text-sm px-3">
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-medium font-['Figtree'] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 sm:ml-1.5 text-blue-600 hover:text-blue-800"
                      >
                        {/* <X size={10} sm:size={12} /> */}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="w-full font-bold font-['Figtree'] rounded-full text-sm md:text-base py-7 border-blue-500 text-black hover:bg-blue-50"
            >
              Preview  <ArrowRight />
            </Button>
            <Button
              onClick={handlePublish}
              className="w-full font-bold font-['Figtree'] rounded-full text-sm md:text-base py-7 bg-blue-500 hover:bg-blue-600 text-gray-50"
            >
              Publish <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogEditorBody
