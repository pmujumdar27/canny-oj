const obj = {
    stdout: "{'args': ['../new_judge/judge.py', 'test_submissions/1661370598759_hello.cpp', '1660999568476_testinput1.txt', '1660999568477_testoutput1.txt']}",
    stderr: ''
}

const so = obj.stdout;
console.log(so);
const jsonobj = JSON.parse(so);

console.log(jsonobj)