function skillsMember() {
  var member = {
    name: 'John Doe',
    age: 30,
    skills: ['HTML', 'CSS', 'JavaScript'],
    showSkills: function() {
      this.skills.forEach(function(skill) {
        console.log(skill);
      });
    }
  };
  member.showSkills();
}