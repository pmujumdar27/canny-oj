import subprocess

INPUT_FILE = '../web_api/test_io/1657405506101_test_inp1.txt'
OUTPUT_FILE = '../web_api/test_io/1657405687612_test_op1.txt'
SUBMISSION_FILE = '../web_api/test_submissions/1657570264411_hello.cpp'

def judge_problem(test_input, test_output, submission_file, language):
    if language=='Cpp':
        ret = subprocess.run(['g++', submission_file, '-o', 'op'], capture_output=True, text=True)
        if (ret.returncode != 0):
            print(ret)
            return ret, "CE"
        with open('op.txt', 'w') as f:
            ret2 = subprocess.run(f'./op < {test_input}', capture_output=False, text=True, shell=True, stdout=f)
        f.close()
        if ret2.returncode != 0:
            return ret2, "RE"
        ret3 = subprocess.run(f'diff -Bb {test_output} op.txt', shell=True, capture_output=True, text=True)
        ret4 = subprocess.run('rm op*', shell=True)
        return ret3, "Done"
    return 1

if __name__=='__main__':
    tmp = judge_problem(INPUT_FILE, OUTPUT_FILE, SUBMISSION_FILE, 'Cpp')