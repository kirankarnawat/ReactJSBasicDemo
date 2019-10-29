const rules = {
    firstName: [{ required: true, message: 'First name is required!' }],
    lastName: [{ required: true, message: 'Last name is required!' }],
    userType: [{ required: true, message: 'Usertype is required!' }],
    department: [{ required: true, message: 'Department is required!' }],
    emailAddress: [{ required: true, message: 'Emailaddress is required!' }]
};

export default rules;
