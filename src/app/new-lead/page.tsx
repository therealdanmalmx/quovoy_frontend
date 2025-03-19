"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useLeads } from "../../../context/leadContext";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

const NewLead = () => {
  const router = useRouter();

  const { createLead } = useLeads();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "" };

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      createLead(formData);
      router.push("/");
    }
  };

  return (
    <div className='max-w-md  mx-auto py-10 px-4'>
      <Link href='/'>
        <div className='flex'>
          <CircleArrowLeft className='hover:text-gray-500 transition-colors duration-200 ease-in-out' />
        </div>
      </Link>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='px-6 py-8'>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            Create New Lead
          </h1>

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Name of lead'
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none ${
                  errors.name
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                }`}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='lead5@example.com'
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                }`}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Status
              </label>
              <div className='relative'>
                <select
                  id='status'
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none appearance-none bg-white'
                >
                  <option value='New'>New</option>
                  <option value='Engaged'>Engaged</option>
                  <option value='Proposal Sent'>Proposal Sent</option>
                  <option value='Closed-Won'>Closed-Won</option>
                  <option value='Closed-Lost'>Closed-Lost</option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
            >
              Create Lead
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLead;
