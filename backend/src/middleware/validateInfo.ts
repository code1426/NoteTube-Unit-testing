const validateInfo = (request: any, response: any, next: any) => {
  const { Email, Username, Password } = request.body;

  const validEmail = (userEmail: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (request.path === "/register") {
    // console.log(!email.length);
    if (![Email, Username, Password].every(Boolean)) {
      console.log("Missing credentials")
      return response.status(401).json({ error: "Missing Credentials" });
    } else if (!validEmail(Email)) {
      console.log("Invalid email")
      return response.status(401).json({ error: "Invalid Email" });
    }
  }
  
  else if (request.path === "/login") {
    if (![Email, Password].every(Boolean)) {
      return response.status(401).json({ error: "Missing Credentials" });
    } else if (!validEmail(Email)) {
      return response.status(401).json({ error: "Invalid Email" });
    }
  }

  next();
};

export default validateInfo;
