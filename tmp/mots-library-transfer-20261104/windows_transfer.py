"""Run the Library transfer helper with metadata stored in Windows NTFS streams."""
import os
import runpy
import sys

if not hasattr(os, 'setxattr'):
    def stream_path(path, name):
        name = os.fsdecode(name)
        if not name.startswith('user.') or any(ch in name for ch in ':\\/'):
            raise ValueError('Unsupported metadata name')
        return os.fsdecode(path) + ':' + name

    def setxattr(path, name, value, flags=0, *, follow_symlinks=True):
        with open(stream_path(path, name), 'wb') as stream:
            stream.write(value)

    def getxattr(path, name, *, follow_symlinks=True):
        with open(stream_path(path, name), 'rb') as stream:
            return stream.read()

    os.setxattr = setxattr
    os.getxattr = getxattr

helper = os.path.join(os.path.dirname(__file__), 'library_file_transfer.py')
sys.argv[0] = helper
runpy.run_path(helper, run_name='__main__')
