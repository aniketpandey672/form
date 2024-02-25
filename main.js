const firebaseConfig = {
    apiKey: "AIzaSyAdBU55_T47NADCVXep6qn87FFswZEqlZA",
    authDomain: "contact-form-dae05.firebaseapp.com",
    databaseURL: "https://contact-form-dae05-default-rtdb.firebaseio.com",
    projectId: "contact-form-dae05",
    storageBucket: "contact-form-dae05.appspot.com",
    messagingSenderId: "485635076465",
    appId: "1:485635076465:web:c852e08f970b9d445e46d0"
  };

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Firebase storage service
  const storage = firebase.storage();
  
  // Reference your database
  const contactFormDB = firebase.database().ref("contactForm");
  
  // Listen for data changes
  contactFormDB.on("value", (snapshot) => {
      // Retrieve data from the snapshot
      const formData = snapshot.val();
      console.log(formData);
  });
  
  // Reference your database
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
      e.preventDefault();
  
      var name = getElementVal("name");
      var emailid = getElementVal("emailid");
      var phone = getElementVal("phone");
      var address = getElementVal("address");
      var university = getElementVal("university");
      var degree = getElementVal("degree");
      var year_of_passing = getElementVal("year_of_passing");
      var field_of_study = getElementVal("field_of_study");
      var company_name = getElementVal("company_name");
      var role_offered = getElementVal("role_offered");
      var year_of_experience = getElementVal("year_of_experience");
      var dob = getElementVal("dob");
      var gender = getElementVal("gender");
      var resumeFile = document.getElementById("resumeInput").files[0]; // Get the resume file
  
      // Upload resume file to Firebase Storage
      const storageRef = storage.ref();
      const resumeRef = storageRef.child(`resumes/${resumeFile.name}`);
      resumeRef.put(resumeFile).then((snapshot) => {
          // Get download URL for the uploaded file
          snapshot.ref.getDownloadURL().then((downloadURL) => {
              // Save form data including download URL of resume to Realtime Database
              saveMessages(name, emailid, phone, address, university, degree, year_of_passing, field_of_study, company_name, role_offered, year_of_experience, dob, gender, downloadURL);
          });
      }).catch((error) => {
          console.error("Error uploading resume:", error);
      });
  
      // Enable alert
      document.querySelector(".alert").style.display = "block";
  
      // Remove the alert
      setTimeout(() => {
          document.querySelector(".alert").style.display = "none";
      }, 3000);
  
      // Reset the form
      document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, emailid, phone, address, university, degree, year_of_passing, field_of_study, company_name, role_offered, year_of_experience, dob, gender, resume) => {
      var newContactForm = contactFormDB.push();
  
      newContactForm.set({
          name: name,
          emailid: emailid,
          phone: phone,
          address: address,
          university: university,
          degree: degree,
          year_of_passing: year_of_passing,
          field_of_study: field_of_study,
          company_name: company_name,
          role_offered: role_offered,
          year_of_experience: year_of_experience,
          dob: dob,
          gender: gender,
          resume: resume,
      });
  };
  
  const getElementVal = (id) => {
      return document.getElementById(id).value;
  };