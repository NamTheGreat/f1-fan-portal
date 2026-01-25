# Gunicorn configuration file
import multiprocessing

# Worker Options
# Limit workers to 1-2 to prevent OOM on free tier (512MB RAM)
# 1 worker is safest for heavy libraries like pandas/fastf1
workers = 2
threads = 2
worker_class = 'gthread'  # Use threads to handle concurrent requests with less RAM

# Timeout
# FastF1 can take a while to download/process data, so we increase timeout
timeout = 120

# Restart workers periodically to clean up any memory leaks
max_requests = 1000
max_requests_jitter = 50

# Logging
loglevel = 'info'
