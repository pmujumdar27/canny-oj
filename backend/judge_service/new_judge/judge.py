import subprocess
import sys

EXEC_DEST = 'op.txt'
INPUT_FILE = '../../web_api/test_io/1657405506101_test_inp1.txt'
OUTPUT_FILE = '../../web_api/test_io/1657405687612_test_op1.txt'
SUBMISSION_FILE = '../../web_api/test_submissions/1657570264411_hello.cpp'

def compile(file, lang):
    if lang=='Cpp':
        ret = subprocess.run(['g++', file, '-o', 'op'], capture_output=True, text=True)
        if (ret.returncode == 0):
            return True
        else:
            return False
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

if __name__=='__main__':
    retval = compile(SUBMISSION_FILE, 'Cpp')
    retval2 = run_code('Cpp', INPUT_FILE, OUTPUT_FILE)
    results = {
        'args': sys.argv,
        'compile': retval,
        'execute': retval2
    }
    print(results)