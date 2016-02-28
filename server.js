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
    academicload: {type: mongoose.Schema.ObjectId, ref: 'AcademicloadModel'},

    //added
    //itrprograms: [{type: mongoose.Schema.ObjectId,ref: 'ItrprogramModel'}]
    //end added
}
);
var residencySchema = mongoose.Schema(
{
    name: String
}
);
var genderSchema = mongoose.Schema(
{
    name: String
}
);
var countrySchema = mongoose.Schema(
{
    name: String
}
);
var provinceSchema = mongoose.Schema(
{
    name: String,
    country: {type: mongoose.Schema.ObjectId, ref: 'CountryModel'}
}
);
var citySchema = mongoose.Schema(
{
    name: String,
    province: {type: mongoose.Schema.ObjectId, ref: 'ProvinceModel'}
}
);
var academicloadSchema = mongoose.Schema(
{
    name: String
}
);

//added
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
    name: String
}
);

var programadministrationSchema = mongoose.Schema(
{
    name: String,
    position: String,
    academicprogramcode: {type:mongoose.Schema.ObjectId, ref: 'AcademicprogramcodeModel'},
    department: {type:mongoose.Schema.ObjectId, ref: 'DepartmentModel'}
}
);


var departmentSchema = mongoose.Schema(
{
    name: String,
    faculty: {type:mongoose.Schema.ObjectId, ref: 'FacultyModel'}
}
);

var facultySchema = mongoose.Schema(
{
    name: String
}
);
//end added

var StudentsModel = mongoose.model('student', studentsSchema);
var ResidencyModel = mongoose.model('residency', residencySchema);
var GenderModel = mongoose.model('gender', genderSchema);
var CountryModel = mongoose.model('country', countrySchema);
var ProvinceModel = mongoose.model('province', provinceSchema);
var CityModel = mongoose.model('city', citySchema);
var AcademicloadModel = mongoose.model('academicload', academicloadSchema);

//added
var AcademicprogramcodeModel = mongoose.model('academicprogramcode', academicprogramcodeSchema);
var ItrprogramModel = mongoose.model('itrprogram', itrprogramSchema);
var ProgramadministrationModel = mongoose.model('programadministration', programadministrationSchema);

var FacultyModel = mongoose.model('faculty', facultySchema);
var DepartmentModel = mongoose.model('department', departmentSchema);
//end added

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
            console.log(response.json({gender: students}));
        });
    }
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

//added
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

/*app.route('/itrlists/:itrlist_id')
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
})*/

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
//end added

app.listen(7700, function () {
    console.log('Listening on port 7700');
});

