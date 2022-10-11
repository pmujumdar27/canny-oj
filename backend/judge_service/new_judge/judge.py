import subprocess
import sys

EXEC_DEST = 'op.txt'
INPUT_FILE = '../../web_api/test_io/1657405506101_test_inp1.txt'
OUTPUT_FILE = '../../web_api/test_io/1657405687612_test_op1.txt'
SUBMISSION_FILE = '../../web_api/test_submissions/1657570264411_hello.cpp'
IO_DIRECTORY = '../../web_api/test_io/'
SUBMISSIONS_DIRECTORY = '../../web_api/'

def compile(file, lang):
    if lang=='Cpp':
        ret = subprocess.run(['g++', file, '-o', 'op'], capture_output=True, text=True)
        if (ret.returncode == 0):
            return ret
        else:
            return ret
    elif lang=='python':
        return True
    else:
        print("Unknown language ", lang)
        return False

def run_code(lang, test_input, test_output):
    if lang=='Cpp':
        
        ret = subprocess.run(f'./op < {test_input}', capture_output=True, text=True, shell=True)
        return ret
    elif lang=='python':
        pass
    else:
        print("Unknown language: ", lang)

def compare(test_output_path, user_output_string):
    test_op_file = open(test_output_path, 'r')
    test_op = test_op_file.read()
    test_op = test_op.strip()
    user_output_string = user_output_string.strip()
    if test_op == user_output_string:
        return 'AC'
    return 'WA'

if __name__=='__main__':
    conn = None

    retval = compile(SUBMISSIONS_DIRECTORY + sys.argv[1], 'Cpp')
    verdict = 'IQ'
    compileresults = {
        'returncode': retval.returncode,
        'stdout': retval.stdout,
        'stderr': retval.stderr
    }
    runresults = {
        'didrun': 'no'
    }
    if compileresults['returncode'] == 0:
        retval2 = run_code('Cpp', IO_DIRECTORY + sys.argv[2], IO_DIRECTORY + sys.argv[3])
        runresults['didrun'] = 'yes'
        runresults['returncode'] = retval2.returncode
        runresults['stdout'] = retval2.stdout
        runresults['stderr'] = retval2.stderr

        if runresults['returncode'] == 0:
            verdict = compare(IO_DIRECTORY + sys.argv[3], runresults['stdout'])
        else:
            verdict = 'RE'
    else:
        verdict = 'CE'
    print(verdict)