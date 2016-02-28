var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./logger');

mongoose.connect('mongodb://localhost/sasdb');

var app = express();

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(logger);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static('public'));

var studentsSchema = mongoose.Schema(
{
    number: String,
    firstName: String,
    lastName: String,
    DOB: String,
    resInfo: {type: mongoose.Schema.ObjectId, ref: 'ResidencyModel'},
    gender: {type: mongoose.Schema.ObjectId, ref: 'GenderModel'},
    country: {type: mongoose.Schema.ObjectId, ref: 'CountryModel'},
    province: {type: mongoose.Schema.ObjectId, ref: 'ProvinceModel'},
    city: {type: mongoose.Schema.ObjectId, ref: 'CityModel'},
    academicload: {type: mongoose.Schema.ObjectId, ref: 'AcademicloadModel'}
    //grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}],
    //distributionresults: [{type: mongoose.Schema.ObjectId, ref: ('DistributionresultModel')}],
    //itrprograms: [{type: mongoose.Schema.ObjectId,ref: 'ItrprogramModel'}]
}
);
var residencySchema = mongoose.Schema(
{
    name: String,
    //students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var genderSchema = mongoose.Schema(
{
    name: String,
    //students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var countrySchema = mongoose.Schema(
{
    name: String,
    //students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}],
    //provinces: [{type: mongoose.Schema.ObjectId, ref: ('ProvinceModel')}]
}
);
var provinceSchema = mongoose.Schema(
{
    name: String,
    //students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}],
    country: {type: mongoose.Schema.ObjectId, ref: 'CountryModel'},
    //cities: [{type: mongoose.Schema.ObjectId, ref: ('CityModel')}]
}
);
var citySchema = mongoose.Schema(
{
    name: String,
    //students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}],
    province: {type: mongoose.Schema.ObjectId, ref: 'ProvinceModel'}
}
);
var academicloadSchema = mongoose.Schema(
{
    name: String,
    //students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var gradeSchema = mongoose.Schema(
{
    mark: String,
    section: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    coursecode: {type: mongoose.Schema.ObjectId, ref: 'CoursecodeModel'},
    programrecord: {type: mongoose.Schema.ObjectId, ref: 'ProgramrecordModel'}
}
);
var coursecodeSchema = mongoose.Schema(
{
    code: String,
    number: String,
    name: String,
    unit: String,
    //grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}]
}
);
var programrecordSchema = mongoose.Schema(
{
    level: String,
    status: String,
    comment: String,
    //grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}],
    degreecode: {type: mongoose.Schema.ObjectId, ref: 'DegreecodeModel'},
    termcode: {type: mongoose.Schema.ObjectId, ref: 'TermcodeModel'}
}
);
var degreecodeSchema = mongoose.Schema(
{
    name: String,
    //programrecords: [{type: mongoose.Schema.ObjectId, ref: ('ProgramrecordModel')}]
}
);
var termcodeSchema = mongoose.Schema(
{
    name: String,
    //programrecords: [{type: mongoose.Schema.ObjectId, ref: ('ProgramrecordModel')}]
}
);
var distributionresultSchema = mongoose.Schema(
{
    date: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    //commentcodes: [{type: mongoose.Schema.ObjectId, ref: ('CommentcodeModel')}]
}
);
var commentcodeSchema = mongoose.Schema(
{
    code: String,
    progaction: String,
    description: String,
    notes: String,
    distributionresult: {type: mongoose.Schema.ObjectId, ref: 'DistributionresultModel'}
}
);
var itrprogramSchema = mongoose.Schema(
{
    order: String,
    eligibility: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    academicprogramcode: {type:mongoose.Schema.ObjectId, ref: 'AcademicprogramcodeModel'}
}
);
var academicprogramcodeSchema = mongoose.Schema(
{
    name: String,
    itrprogram: {type:mongoose.Schema.ObjectId, ref: 'ItrprogramModel'},
    //programadministrations: [{type: mongoose.Schema.ObjectId, ref: ('ProgramadministrationModel')}]
}
);

var programadministrationSchema = mongoose.Schema(
{
    name: String,
    position: String,
    academicprogramcode: {type:mongoose.Schema.ObjectId, ref: 'AcademicprogramcodeModel'}
}
);

var facultySchema = mongoose.Schema(
{
    name: String
}
);

var departmentSchema = mongoose.Schema(
{
    name: String,
    faculty: {type:mongoose.Schema.ObjectId, ref: 'FacultyModel'}
}
);

var StudentsModel = mongoose.model('student', studentsSchema);
var ResidencyModel = mongoose.model('residency', residencySchema);
var GenderModel = mongoose.model('gender', genderSchema);
var CountryModel = mongoose.model('country', countrySchema);
var ProvinceModel = mongoose.model('province', provinceSchema);
var CityModel = mongoose.model('city', citySchema);
var AcademicloadModel = mongoose.model('academicload', academicloadSchema);
var GradeModel = mongoose.model('grade', gradeSchema);
var CoursecodeModel = mongoose.model('coursecode', coursecodeSchema);
var ProgramrecordModel = mongoose.model('programrecord', programrecordSchema);
var DegreecodeModel = mongoose.model('degreecode', degreecodeSchema);
var TermcodeModel = mongoose.model('termcode', termcodeSchema);
var DistributionresultModel = mongoose.model('distributionresult', distributionresultSchema);
var CommentcodeModel = mongoose.model('commentcode', commentcodeSchema);
var AcademicprogramcodeModel = mongoose.model('academicprogramcode', academicprogramcodeSchema);
var ItrprogramModel = mongoose.model('itrprogram', itrprogramSchema);
var ProgramadministrationModel = mongoose.model('programadministration', programadministrationSchema);
var FacultyModel = mongoose.model('faculty', facultySchema);
var DepartmentModel = mongoose.model('department', departmentSchema);

app.route('/students')
.post(function (request, response) {
    var student = new StudentsModel(request.body.student);
    student.save(function (error) {
        if (error) response.send(error);
        response.json({student: student});
    });
})
.get(function (request, response) {
    var Student = request.query.student;
    if (!Student) {
        StudentsModel.find(function (error, students) {
            if (error) response.send(error);
            response.json({student: students});
        });
    }
});

app.route('/students/:student_id')
.get(function (request, response) {
    StudentsModel.findById(request.params.student_id, function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({student: student});
        }
    });
})
.put(function (request, response) {
    StudentsModel.findById(request.params.student_id, function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            student.number = request.body.student.number;
            student.firstName = request.body.student.firstName;
            student.lastName = request.body.student.lastName;
            student.DOB = request.body.student.DOB;
            student.resInfo = request.body.student.resInfo;
            student.gender = request.body.student.gender;
            student.country = request.body.student.country;
            student.province = request.body.student.province;
            student.city = request.body.student.city;
            student.academicload = request.body.student.academicload;

            student.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({student: student});
                }
            });
        }
    });
})
.delete(function (request, response) {
    StudentsModel.findByIdAndRemove(request.params.student_id,
        function (error, deleted) {
            if (!error) {
                response.json({student: deleted});
            };
        }
        );
});

//added - GRADES
app.route('/grades')
.post(function (request, response) {
    var grade = new GradeModel(request.body.grade);
    grade.save(function (error) {
        if (error) response.send(error);
        response.json({grade: grade});
    });
})
.get(function (request, response) {
    var Grade = request.query.grade;
    if (!Grade) {
        GradeModel.find(function (error, grades) {
            if (error) response.send(error);
            response.json({grade: grades});
        });
    }
});

app.route('/grades/:grade_id')
.get(function (request, response) {
    GradeModel.findById(request.params.grade_id, function (error, grade) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({grade: grade});
        }
    });
})
.put(function (request, response) {
    GradeModel.findById(request.params.grade_id, function (error, grade) {
        if (error) {
            response.send({error: error});
        }
        else {
            grade.mark = request.body.grade.mark;
            grade.section = request.body.grade.section;
            grade.student = request.body.grade.student;
            grade.coursecode = request.body.grade.coursecode;
            grade.programrecord = request.body.grade.programrecord;

            grade.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({grade: grade});
                }
            });
        }
    });
})
.delete(function (request, response) {
    GradeModel.findByIdAndRemove(request.params.grade_id,
        function (error, deleted) {
            if (!error) {
                response.json({grade: deleted});
            };
        }
        );
});
//end added - GRADES

//added - COURSECODES
app.route('/coursecodes')
.post(function (request, response) {
    var coursecode = new CoursecodeModel(request.body.coursecode);
    coursecode.save(function (error) {
        if (error) response.send(error);
        response.json({coursecode: coursecode});
    });
})
.get(function (request, response) {
    var Grade = request.query.filter;
    if (!Grade) {
        CoursecodeModel.find(function (error, coursecodes) {
            if (error) response.send(error);
            response.json({coursecode: coursecodes});
        });
    } else {
        PermissionTypeModel.find({"grade": Grade.grade}, function (error, grades) {
            if (error) response.send(error);
            response.json({coursecode: grades});
        });
    }
});

app.route('/coursecodes/:coursecode_id')
.get(function (request, response) {
    CoursecodeModel.findById(request.params.coursecode_id, function (error, coursecode) {
        if (error) response.send(error);
        response.json({coursecode: coursecode});
    })
})
.put(function (request, response) {
    CoursecodeModel.findById(request.params.coursecode_id, function (error, coursecode) {
        if (error) {
            response.send({error: error});
        }
        else {
            coursecode.code = request.body.coursecode.code;
            coursecode.number = request.body.coursecode.number;
            coursecode.name = request.body.coursecode.name;
            coursecode.unit = request.body.coursecode.unit;
            coursecode.grades = request.body.coursecode.grades;

            coursecode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({coursecode: coursecode});
                }
            });
        }
    })
})
.delete(function (request, response) {
    CoursecodeModel.findByIdAndRemove(request.params.coursecode_id,
        function (error, deleted) {
            if (!error) {
                response.json({coursecode: deleted});
            };
        }
        );
});;
//end added - COURSECODES

//added - PROGRAMRECORDS
app.route('/programrecords')
.post(function (request, response) {
    var programrecord = new ProgramrecordModel(request.body.programrecord);
    programrecord.save(function (error) {
        if (error) response.send(error);
        response.json({programrecord: programrecord});
    });
})
.get(function (request, response) {
    var Programrecord = request.query.programrecord;
    if (!Programrecord) {
        ProgramrecordModel.find(function (error, programrecords) {
            if (error) response.send(error);
            response.json({programrecord: programrecords});
        });
    }
});

app.route('/programrecords/:programrecord_id')
.get(function (request, response) {
    ProgramrecordModel.findById(request.params.programrecord_id, function (error, programrecord) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programrecord: programrecord});
        }
    });
})
.put(function (request, response) {
    ProgramrecordModel.findById(request.params.programrecord_id, function (error, programrecord) {
        if (error) {
            response.send({error: error});
        }
        else {
            programrecord.level = request.body.programrecord.level;
            programrecord.status = request.body.programrecord.status;
            programrecord.comment = request.body.programrecord.comment;
            programrecord.degreecode = request.body.programrecord.degreecode;
            programrecord.termcode = request.body.programrecord.termcode;

            programrecord.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({programrecord: programrecord});
                }
            });
        }
    });
})
.delete(function (request, response) {
    ProgramrecordModel.findByIdAndRemove(request.params.programrecord_id,
        function (error, deleted) {
            if (!error) {
                response.json({programrecord: deleted});
            };
        }
        );
});
//end added - PROGRAMRECORDS

//added - DEGREECODES
app.route('/degreecodes')
.post(function (request, response) {
    var degreecode = new DegreecodeModel(request.body.degreecode);
    degreecode.save(function (error) {
        if (error) response.send(error);
        response.json({degreecode: degreecode});
    });
})
.get(function (request, response) {
    var Programrecord = request.query.filter;
    if (!Programrecord) {
        DegreecodeModel.find(function (error, degreecodes) {
            if (error) response.send(error);
            response.json({degreecode: degreecodes});
        });
    } else {
        PermissionTypeModel.find({"programrecord": Programrecord.programrecord}, function (error, programrecords) {
            if (error) response.send(error);
            response.json({degreecode: programrecords});
        });
    }
});

app.route('/degreecodes/:degreecode_id')
.get(function (request, response) {
    DegreecodeModel.findById(request.params.degreecode_id, function (error, degreecode) {
        if (error) response.send(error);
        response.json({degreecode: degreecode});
    })
})
.put(function (request, response) {
    DegreecodeModel.findById(request.params.degreecode_id, function (error, degreecode) {
        if (error) {
            response.send({error: error});
        }
        else {
            degreecode.name = request.body.degreecode.name;
            degreecode.programrecords = request.body.degreecode.programrecords;

            degreecode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({degreecode: degreecode});
                }
            });
        }
    })
})
.delete(function (request, response) {
    DegreecodeModel.findByIdAndRemove(request.params.degreecode_id,
        function (error, deleted) {
            if (!error) {
                response.json({degreecode: deleted});
            };
        }
        );
});
//end added - DEGREECODES

//added - TERMCODES
app.route('/termcodes')
.post(function (request, response) {
    var termcode = new TermcodeModel(request.body.termcode);
    termcode.save(function (error) {
        if (error) response.send(error);
        response.json({termcode: termcode});
    });
})
.get(function (request, response) {
    var Programrecord = request.query.filter;
    if (!Programrecord) {
        TermcodeModel.find(function (error, termcodes) {
            if (error) response.send(error);
            response.json({termcode: termcodes});
        });
    } else {
        PermissionTypeModel.find({"programrecord": Programrecord.programrecord}, function (error, programrecords) {
            if (error) response.send(error);
            response.json({termcode: programrecords});
        });
    }
});

app.route('/termcodes/:termcode_id')
.get(function (request, response) {
    TermcodeModel.findById(request.params.termcode_id, function (error, termcode) {
        if (error) response.send(error);
        response.json({termcode: termcode});
    })
})
.put(function (request, response) {
    TermcodeModel.findById(request.params.termcode_id, function (error, termcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            termcode.name = request.body.termcode.name;
            termcode.programrecords = request.body.termcode.programrecords;

            termcode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({termcode: termcode});
                }
            });
        }
    })
})
.delete(function (request, response) {
    TermcodeModel.findByIdAndRemove(request.params.termcode_id,
        function (error, deleted) {
            if (!error) {
                response.json({termcode: deleted});
            };
        }
        );
});
//end added - TERMCODES

//added - DISTRIBUTIONRESULTS
app.route('/distributionresults')
.post(function (request, response) {
    var distributionresult = new DistributionresultModel(request.body.distributionresult);
    distributionresult.save(function (error) {
        if (error) response.send(error);
        response.json({distributionresult: distributionresult});
    });
})
.get(function (request, response) {
    var Distributionresult = request.query.distributionresult;
    if (!Distributionresult) {
        DistributionresultModel.find(function (error, distributionresults) {
            if (error) response.send(error);
            response.json({distributionresult: distributionresults});
        });
    }
});

app.route('/distributionresults/:distributionresult_id')
.get(function (request, response) {
    DistributionresultModel.findById(request.params.distributionresult_id, function (error, distributionresult) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({distributionresult: distributionresult});
        }
    });
})
.put(function (request, response) {
    DistributionresultModel.findById(request.params.distributionresult_id, function (error, distributionresult) {
        if (error) {
            response.send({error: error});
        }
        else {
            distributionresult.date = request.body.distributionresult.date;
            distributionresult.student = request.body.distributionresult.student;

            distributionresult.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({distributionresult: distributionresult});
                }
            });
        }
    });
})
.delete(function (request, response) {
    DistributionresultModel.findByIdAndRemove(request.params.distributionresult_id,
        function (error, deleted) {
            if (!error) {
                response.json({distributionresult: deleted});
            };
        }
        );
});
//end added - DISTRIBUTIONRESULTS

//added - COMMENTCODES
app.route('/commentcodes')
.post(function (request, response) {
    var commentcode = new CommentcodeModel(request.body.commentcode);
    commentcode.save(function (error) {
        if (error) response.send(error);
        response.json({commentcode: commentcode});
    });
})
.get(function (request, response) {
    var Commentcode = request.query.commentcode;
    if (!Commentcode) {
        CommentcodeModel.find(function (error, commentcodes) {
            if (error) response.send(error);
            response.json({commentcode: commentcodes});
        });
    }
});

app.route('/commentcodes/:commentcode_id')
.get(function (request, response) {
    CommentcodeModel.findById(request.params.commentcode_id, function (error, commentcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({commentcode: commentcode});
        }
    });
})
.put(function (request, response) {
    CommentcodeModel.findById(request.params.commentcode_id, function (error, commentcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            commentcode.date = request.body.commentcode.date;
            commentcode.distributionresult = request.body.commentcode.distributionresult;

            commentcode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({commentcode: commentcode});
                }
            });
        }
    });
})
.delete(function (request, response) {
    CommentcodeModel.findByIdAndRemove(request.params.commentcode_id,
        function (error, deleted) {
            if (!error) {
                response.json({commentcode: deleted});
            };
        }
        );
});
//end added - COMMENTCODES

app.route('/residencies')
.post(function (request, response) {
    var residency = new ResidencyModel(request.body.residency);
    residency.save(function (error) {
        if (error) response.send(error);
        response.json({residency: residency});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        ResidencyModel.find(function (error, residencies) {
            if (error) response.send(error);
            response.json({residency: residencies});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({residency: students});
        });
    }
});

app.route('/residencies/:residency_id')
.get(function (request, response) {
    ResidencyModel.findById(request.params.residency_id, function (error, residency) {
        if (error) response.send(error);
        response.json({residency: residency});
    })
})
.put(function (request, response) {
    ResidencyModel.findById(request.params.residency_id, function (error, residency) {
        if (error) {
            response.send({error: error});
        }
        else {
            residency.name = request.body.residency.name;
            residency.students = request.body.residency.students;

            residency.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({residency: residency});
                }
            });
        }
    })
})
.delete(function (request, response) {
    ResidencyModel.findByIdAndRemove(request.params.residency_id,
        function (error, deleted) {
            if (!error) {
                response.json({residency: deleted});
            };
        }
        );
});

app.route('/genders')
.post(function (request, response) {
    var gender = new GenderModel(request.body.gender);
    gender.save(function (error) {
        if (error) response.send(error);
        response.json({gender: gender});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        GenderModel.find(function (error, genders) {
            if (error) response.send(error);
            response.json({gender: genders});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({gender: students});
        });
    }
});

app.route('/genders/:gender_id')
.get(function (request, response) {
    GenderModel.findById(request.params.gender_id, function (error, gender) {
        if (error) response.send(error);
        response.json({gender: gender});
    })
})
.put(function (request, response) {
    GenderModel.findById(request.params.gender_id, function (error, gender) {
        if (error) {
            response.send({error: error});
        }
        else {
            gender.name = request.body.gender.name;
            gender.students = request.body.gender.students;

            gender.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({gender: gender});
                }
            });
        }
    })
});

app.route('/countries')
.post(function (request, response) {
    var country = new CountryModel(request.body.country);
    country.save(function (error) {
        if (error) response.send(error);
        response.json({country: country});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        CountryModel.find(function (error, countries) {
            if (error) response.send(error);
            response.json({country: countries});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({country: students});
        });
    }

    // //added
    // var Province = request.query.filter;
    // if (!Province) {
    //     CountryModel.find(function (error, countries) {
    //         if (error) response.send(error);
    //         response.json({country: countries});
    //     });
    // } else {
    //     PermissionTypeModel.find({"province": Province.province}, function (error, provinces) {
    //         if (error) response.send(error);
    //         response.json({country: provinces});
    //     });
    // }
    // //end added
});

app.route('/countries/:country_id')
.get(function (request, response) {
    CountryModel.findById(request.params.country_id, function (error, country) {
        if (error) response.send(error);
        response.json({country: country});
    })
})
.put(function (request, response) {
    CountryModel.findById(request.params.country_id, function (error, country) {
        if (error) {
            response.send({error: error});
        }
        else {
            country.name = request.body.country.name;
            country.students = request.body.country.students;
            country.provinces = request.body.country.provinces;

            country.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({country: country});
                }
            });
        }
    })
})
.delete(function (request, response) {
    CountryModel.findByIdAndRemove(request.params.country_id,
        function (error, deleted) {
            if (!error) {
                response.json({country: deleted});
            };
        }
        );
});

app.route('/provinces')
.post(function (request, response) {
    var province = new ProvinceModel(request.body.province);
    province.save(function (error) {
        if (error) response.send(error);
        response.json({province: province});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        ProvinceModel.find(function (error, provinces) {
            if (error) response.send(error);
            response.json({province: provinces});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({province: students});
        });
    }

    // //added
    // var Province = request.query.province;
    // if (!Province) {
    //     ProvinceModel.find(function (error, provinces) {
    //         if (error) response.send(error);
    //         response.json({province: provinces});
    //     });
    // } else {
    //     if(Province == "country"){
    //         ProvinceModel.find({"country": request.query.country}, function (error, provinces) {
    //             if (error) response.send(error);
    //             response.json({province: provinces});
    //         });
    //     }
    // }
    // //end added
});

app.route('/provinces/:province_id')
.get(function (request, response) {
    ProvinceModel.findById(request.params.province_id, function (error, province) {
        if (error) response.send(error);
        response.json({province: province});
    })
})
.put(function (request, response) {
    ProvinceModel.findById(request.params.province_id, function (error, province) {
        if (error) {
            response.send({error: error});
        }
        else {
            province.name = request.body.province.name;
            province.students = request.body.province.students;
            province.country = request.body.province.country;
            province.cities = request.body.province.cities;

            province.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({province: province});
                }
            });
        }
    })
})
.delete(function (request, response) {
    ProvinceModel.findByIdAndRemove(request.params.province_id,
        function (error, deleted) {
            if (!error) {
                response.json({province: deleted});
            };
        }
        );
});

app.route('/cities')
.post(function (request, response) {
    var city = new CityModel(request.body.city);
    city.save(function (error) {
        if (error) response.send(error);
        response.json({city: city});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        CityModel.find(function (error, cities) {
            if (error) response.send(error);
            response.json({city: cities});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({city: students});
        });
    }
});

app.route('/cities/:city_id')
.get(function (request, response) {
    CityModel.findById(request.params.city_id, function (error, city) {
        if (error) response.send(error);
        response.json({city: city});
    })
})
.put(function (request, response) {
    CityModel.findById(request.params.city_id, function (error, city) {
        if (error) {
            response.send({error: error});
        }
        else {
            city.name = request.body.city.name;
            city.students = request.body.city.students;
            city.province = request.body.city.province;
            city.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({city: city});
                }
            });
        }
    })
})
.delete(function (request, response) {
    CityModel.findByIdAndRemove(request.params.city_id,
        function (error, deleted) {
            if (!error) {
                response.json({city: deleted});
            };
        }
        );
});

app.route('/academicloads')
.post(function (request, response) {
    var academicload = new AcademicloadModel(request.body.academicload);
    academicload.save(function (error) {
        if (error) response.send(error);
        response.json({academicload: academicload});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        AcademicloadModel.find(function (error, academicloads) {
            if (error) response.send(error);
            response.json({academicload: academicloads});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({academicload: students});
        });
    }
});

app.route('/academicloads/:academicload_id')
.get(function (request, response) {
    AcademicloadModel.findById(request.params.academicload_id, function (error, academicload) {
        if (error) response.send(error);
        response.json({academicload: academicload});
    })
})
.put(function (request, response) {
    AcademicloadModel.findById(request.params.academicload_id, function (error, academicload) {
        if (error) {
            response.send({error: error});
        }
        else {
            academicload.name = request.body.academicload.name;
            academicload.students = request.body.academicload.students;

            academicload.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({academicload: academicload});
                }
            });
        }
    })
})
.delete(function (request, response) {
    AcademicloadModel.findByIdAndRemove(request.params.academicload_id,
        function (error, deleted) {
            if (!error) {
                response.json({academicload: deleted});
            };
        }
        );
});

//ADDED - ITRPROGRAMS
app.route('/itrprograms')
.post(function (request, response) {
    var itrprogram = new ItrprogramModel(request.body.itrprogram);
    itrprogram.save(function (error) {
        if (error) response.send(error);
        response.json({itrprogram: itrprogram});
    });
})
.get(function (request, response) {
    var itrprogram = request.query.itrprogram;
    if (!itrprogram) {
        ItrprogramModel.find(function (error, itrprograms) {
            if (error) response.send(error);
            response.json({itrprogram: itrprograms});
        });
    } 
});

app.route('/itrlists/:itrlist_id')
.get(function (request, response) {
    ItrlistModel.findById(request.params.itrlist_id, function (error, itrlist) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({itrlist: itrlist});
        }
    });
})
.put(function (request, response) {
    ItrlistModel.findById(request.params.itrlist_id, function (error, itrlist) {
        if (error) {
            response.send({error: error});
        }
        else {
            itrlist.order = request.body.itrlist.order;
            itrlist.eligibility = request.body.itrlist.eligibility;
            itrlist.student = request.body.itrlist.student;
            itrlist.academicprogramcode = request.body.itrlist.academicprogramcode;
            itrlist.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({itrlist: itrlist});
                }
            });
        }
    });
})
//END ADDED - ITRPROGRAMS

//ADDED - ACADEMICPROGRAMCODES
app.route('/academicprogramcodes')
.post(function (request, response) {
    var academicprogramcode = new AcademicprogramcodeModel(request.body.academicprogramcode);
    academicprogramcode.save(function (error) {
        if (error) response.send(error);
        response.json({academicprogramcode: academicprogramcode});
    });
})
.get(function (request, response) {
    var academicprogramcode = request.query.academicprogramcode;
    if (!academicprogramcode) {
        AcademicprogramcodeModel.find(function (error, academicprogramcodes) {
            if (error) response.send(error);
            response.json({academicprogramcode: academicprogramcodes});
        });
    } 
});
//END ADDED - ACADEMICPROGRAMCODES

//ADDED - PROGRAMADMINISTRATIONS
app.route('/programadministrations')
.post(function (request, response) {
    var programadministration = new ProgramadministrationModel(request.body.programadministration);
    programadministration.save(function (error) {
        if (error) response.send(error);
        response.json({programadministration: programadministration});
    });
})
.get(function (request, response) {
    var programadministration = request.query.programadministration;
    if (!programadministration) {
        ProgramadministrationModel.find(function (error, programadministrations) {
            if (error) response.send(error);
            response.json({programadministration: programadministrations});
        });
    } 
});
//END ADDED - PROGRAMADMINISTRATIONS

//ADDED - DEPARTMENTS
app.route('/departments')
.post(function (request, response) {
    var department = new DepartmentModel(request.body.department);
    department.save(function (error) {
        if (error) response.send(error);
        response.json({department: department});
    });
})
.get(function (request, response) {
    var department = request.query.department;
    if (!department) {
        DepartmentModel.find(function (error, departments) {
            if (error) response.send(error);
            response.json({department: departments});
        });
    } 
});
//END ADDED - DEPARTMENTS

//ADDED - FACULTIES
app.route('/faculties')
.post(function (request, response) {
    var faculty = new FacultyModel(request.body.faculty);
    faculty.save(function (error) {
        if (error) response.send(error);
        response.json({faculty: faculty});
    });
})
.get(function (request, response) {
    var faculty = request.query.faculty;
    if (!faculty) {
        FacultyModel.find(function (error, faculties) {
            if (error) response.send(error);
            response.json({faculty: faculties});
        });
    } 
});
//END ADDED - FACULTIES

app.listen(7700, function () {
    console.log('Listening on port 7700');
});
