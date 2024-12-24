import React, { useState,createContext } from "react";

export const userContext = createContext();

const EmployeeForm = () => {
  
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    department: "",
    address: "",
    terms: false,
  });

  console.log(formData);
  

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "A valid email is required.";

    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";

    if (!formData.dob) newErrors.dob = "Date of birth is required.";

    if (!formData.gender) newErrors.gender = "Please select a gender.";

    if (!formData.department) newErrors.department = "Please select a department.";

    if (!formData.address || formData.address.length < 10)
      newErrors.address = "Address must be at least 10 characters.";

    if (!formData.terms) newErrors.terms = "You must accept the terms and conditions.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form Data:", formData);
      setErrors({});
    } else {
      setErrors(newErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <userContext.Provider value={formData}>
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Employee Registration Form</h2>
  
        

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>

        {/* Email Input */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>

        {/* Phone Input */}
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
        </div>

        {/* Date of Birth Input */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span style={{ color: "red" }}>{errors.dob}</span>}
        </div>

        {/* Gender Radio Buttons */}
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          {errors.gender && <span style={{ color: "red" }}>{errors.gender}</span>}
        </div>

        {/* Department Select Dropdown */}
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && <span style={{ color: "red" }}>{errors.department}</span>}
        </div>

        {/* Address Textarea */}
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
          {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
        </div>

        {/* Terms Checkbox */}
        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I accept the terms and conditions.
          </label>
          {errors.terms && <span style={{ color: "red" }}>{errors.terms}</span>}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>

      {isSubmitted && <div style={{ color: "green" }}>Form submitted successfully!</div>}

      
    </div>
    </userContext.Provider>
  );
};

export default EmployeeForm;
