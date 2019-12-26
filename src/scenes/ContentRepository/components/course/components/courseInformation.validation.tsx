const rules = {
    courseCategoryId: [{ required: true, message: 'Course category is required' }],
    courseUniqueId: [{ required: true, message: 'Course Id is required' }],
    uploadedFile: [{ required: true, message: 'Scrom content file is required' }],
    courseDurationHH: [{ required: true, message: 'Course duration(in Hr) is required' }],
    courseDurationMM: [{ required: true, message: 'Course duration(in Min) is required' }],
    launchPreference: [{ required: true, message: 'Launch preference is required' }],
    headerImage: [{ required: true, message: 'header image is required' }],
    norequired: [{ required: false, message: '' }]
};

export default rules;
