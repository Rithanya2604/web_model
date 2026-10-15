var app = angular.module("studentApp", []);
app.controller("studentCtrl", function($scope, $http) {
    var API = "http://localhost:3000/students";
    $scope.students = [];
    $scope.filteredStudents = [];
    $scope.form = {};
    $scope.page = "home";
    $scope.editingId = null;
    $scope.search = { name: "" };
    $scope.loadStudents = function() {
        $http.get(API).then(function(res) {
            $scope.students = res.data;
            $scope.searchStudent();
        });
    };
    $scope.goTo = function(page) {
        $scope.page = page;
        if (page === "view") $scope.loadStudents();
        if (page === "add") {
            $scope.form = {};
            $scope.editingId = null;
        }
    };
    $scope.saveStudent = function() {
        if (!$scope.form.name || !$scope.form.regno ||
            !$scope.form.department) {
            alert("Fill all fields");
            return;
        }
        var request = $scope.editingId
            ? $http.put(API + "/" + $scope.editingId, $scope.form)
            : $http.post(API, $scope.form);
        request.then(function() {
            alert("Student saved successfully");
            $scope.form = {};
            $scope.editingId = null;
            $scope.page = "view";
            $scope.loadStudents();
        }).catch(function(error) {
            alert(error.data.error || "Operation failed");
        });
    };
    $scope.editStudent = function(student) {
        $scope.form = {
            name: student.name,
            regno: student.regno,
            department: student.department
        };
        $scope.editingId = student._id;
        $scope.page = "add";
    };
    $scope.deleteStudent = function(student) {
        if (confirm("Delete " + student.name + "?")) {
            $http.delete(API + "/" + student._id).then(function() {
                alert("Student deleted");
                $scope.loadStudents();
            });
        }
    };
    $scope.searchStudent = function() {
        var name = ($scope.search.name || "").toLowerCase();

        $scope.filteredStudents = $scope.students.filter(function(s) {
            return s.name.toLowerCase().includes(name);
        });
    };
    $scope.resetForm = function() {
        $scope.form = {};
        $scope.editingId = null;
    };
    $scope.clearSearch = function() {
        $scope.search.name = "";
        $scope.searchStudent();
    };
    $scope.loadStudents();
});
