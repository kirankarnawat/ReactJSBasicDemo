const rules = {
    firstname: [{ required: true, message: 'First name is required' }],
    lastname: [{ required: true, message: 'Last name is required!' }],
    emailAddress: [{ required: true, message: 'Username/Email is required!' }, { validator: this.IsEmail}],
    hiringDate: [{ required: true, message: 'Hiring date is required!' }],
    jobCodeId: [{ required: true, message: 'Job code is required!' }],
    roleChangeDate: [{ required: true, message: 'Role change date is required!' }],
};

export default rules;
