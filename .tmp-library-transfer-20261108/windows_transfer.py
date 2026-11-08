import os
import runpy
import sys

# Preserve Library metadata in NTFS alternate data streams on Windows.
if not hasattr(os, "setxattr"):
    def setxattr(path, attribute, value, flags=0, *, follow_symlinks=True):
        with open(os.fsdecode(path) + ":" + os.fsdecode(attribute), "wb") as stream:
            stream.write(value)

    def getxattr(path, attribute, *, follow_symlinks=True):
        with open(os.fsdecode(path) + ":" + os.fsdecode(attribute), "rb") as stream:
            return stream.read()

    os.setxattr = setxattr
    os.getxattr = getxattr

helper = os.path.join(os.path.dirname(__file__), "library_file_transfer.py")
sys.argv = [helper] + sys.argv[1:]
runpy.run_path(helper, run_name="__main__")
