"use client";

import React, { useEffect, useState } from "react";
import { Avatar } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Skeleton } from "./ui/skeleton";
import { useAppSelector } from "@/lib/hook";

export const ProfileCard = ({ views, post }: { views: string; post: string }) => {
  const { email } = useAppSelector((s) => s.user);

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    location: "",
    link: "",
    about: "",
    profile_image: null as File | null,
  });

  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        const res = await fetch(`/api/userDetails?email=${email}`);
        const data = await res.json();

        if (data.status) {
          setProfileData(data.userDetails);
          setFormData({
            username: data.userDetails.username || "",
            location: data.userDetails.location || "",
            link: data.userDetails.link || "",
            about: data.userDetails.about || "",
            profile_image: null,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  const handleSave = async () => {
    if (!email) return;

    setSaving(true);
    const fd = new FormData();
    fd.append("email", email);
    fd.append("username", formData.username);
    fd.append("location", formData.location);
    fd.append("link", formData.link);
    fd.append("about", formData.about);
    if (formData.profile_image) {
      fd.append("profile_image", formData.profile_image);
    }

    const res = await fetch("/api/userDetails", {
      method: "PUT",
      body: fd,
    });

    const data = await res.json();
    if (data.status) {
      setProfileData(data.item);
      setEditing(false);
      setFormData((prev) => ({
        ...prev,
        profile_image: null,
      }));
    } else {
      alert(data.error || "Failed to update profile");
    }

    setSaving(false);
  };

  return (
    <div className="w-full max-w-[384px] md:sticky md:top-28 self-start">
      <Card className="p-2 border-[#E5E7EB] border-2 rounded-[12px]">
        <CardContent className="px-7 pt-5 flex flex-col items-center">
          {loading ? (
            <Skeleton className="w-20 h-20 rounded-full" />
          ) : (
            <Avatar className="w-20 h-20 relative">
              <label htmlFor="profile_image" className="cursor-pointer w-full h-full">
                <img
                  src={
                    formData.profile_image
                      ? URL.createObjectURL(formData.profile_image)
                      : profileData?.profile_image || "/images/profile/img.svg"
                  }
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </label>
              {editing && (
                <input
                  id="profile_image"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profile_image: e.target.files?.[0] || null,
                    }))
                  }
                />
              )}
            </Avatar>
          )}

          <div className="flex flex-col gap-[7.8px] mt-[12.24px] justify-center items-center">
            {loading ? (
              <>
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </>
            ) : editing ? (
              <>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <p className="text-lg font-bold text-[#4B5563] mb-4">@{formData.username || "username"}</p>
              </>
            ) : (
              <>
                <h2 className="font-black text-2xl text-gray-900 leading-7">
                  {profileData?.fullName || "Anonymous"}
                </h2>
                <p className="text-lg font-bold text-[#4B5563] mb-4">
                  @{profileData?.username || "username"}
                </p>
              </>
            )}
          </div>

          <div className="flex justify-center w-full gap-1 mb-4">
            <div className="flex flex-col items-center w-20">
              <span className="font-black text-2xl text-gray-900">{post}</span>
              <span className="text-sm font-bold text-[#4B5563]">Posts</span>
            </div>
            <div className="flex flex-col items-center w-20">
              <span className="font-black text-2xl text-gray-900">{views}</span>
              <span className="text-sm font-bold text-[#4B5563]">Views</span>
            </div>
          </div>

          <div className="w-full space-y-3 mt-4 py-5 flex flex-col gap-2 border-t-[1px] border-[#F3F4F6] mb-3">
            {loading ? (
              Array(4)
                .fill(null)
                .map((_, i) => <Skeleton key={i} className="h-4 w-full" />)
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4 mr-3" src="/images/profile/img-2.svg" alt="" />
                  <span className="text-sm font-bold text-gray-600">
                    Joined{" "}
                    {new Date(profileData?.createdAt || "").toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4 mr-3" src="/images/profile/img-3.svg" alt="" />
                  {editing ? (
                    <Input
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">
                      {profileData?.location || "Location not set"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4 mr-3" src="/images/profile/img-4.svg" alt="" />
                  {editing ? (
                    <Input
                      placeholder="Link"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                  ) : (
                    <span className="text-sm font-bold text-blue-600">
                      {profileData?.link || "No link added"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4 mr-3" src="/images/profile/img-5.svg" alt="" />
                  <span className="text-sm font-bold text-gray-600">{email}</span>
                </div>
              </>
            )}
          </div>

          <div className="w-full border-t-[1px] border-[#F3F4F6] flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-1">About</h3>
            {loading ? (
              <Skeleton className="h-24 w-full rounded" />
            ) : editing ? (
              <Textarea
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              />
            ) : (
              <p className="text-sm font-bold text-gray-600">{profileData?.about || "No about section added."}</p>
            )}
          </div>
        </CardContent>

        <div className="w-full px-4 pb-4">
          {editing ? (
            <div className="flex flex-col gap-2">
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    username: profileData?.username || "",
                    location: profileData?.location || "",
                    link: profileData?.link || "",
                    about: profileData?.about || "",
                    profile_image: null,
                  });
                }}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button className="w-full py-4 text-[16px] font-[500] bg-[#2563EB] hover:bg-blue-700" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
