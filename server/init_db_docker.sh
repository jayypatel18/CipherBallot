#!/bin/bash
# Initialize database and start server
python init_db.py
exec "$@"