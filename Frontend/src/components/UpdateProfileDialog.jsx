import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { USER_API_END_POINT } from './utils/constant'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    bio: '',
    skills: '',
    file: null
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)

    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      setLoading(true)

      const response = await fetch(`${USER_API_END_POINT}/profile/update`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      toast.success(data.message || 'Profile updated successfully')
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[480px] bg-white rounded-xl p-6 shadow-md"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-5 mt-2">
          {[
            { id: 'fullname', label: 'Name', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phoneNumber', label: 'Number', type: 'text' },
            { id: 'bio', label: 'Bio', type: 'text' },
            { id: 'skills', label: 'Skills', type: 'text' }
          ].map(({ id, label, type }) => (
            <div key={id} className="flex flex-col gap-1">
              <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
              <Input
                id={id}
                name={id}
                type={type}
                value={input[id]}
                onChange={changeEventHandler}
                className="bg-gray-50 border border-gray-300 focus:ring-primary focus:border-primary rounded-md"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <Label htmlFor="file" className="text-sm font-medium text-gray-700">Resume (PDF)</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="bg-gray-50 border border-gray-300 rounded-md"
            />
          </div>

          <DialogFooter className="mt-5">
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
