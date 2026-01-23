# # import pyodbc
# # from django.core.management.base import BaseCommand
# # from ledger.models import TallyData

# # class Command(BaseCommand):
# #     help = 'Fetch Ledger Data from Tally ODBC and save into DB as JSON (all values as strings)'

# #     def handle(self, *args, **kwargs):
# #         try:
# #             # Establish ODBC connection
# #             conn = pyodbc.connect(
# #                 r'Driver={Tally ODBC Driver64};Port=9000;UID=;PWD=;',
# #                 autocommit=True
# #             )

# #             cursor = conn.cursor()

# #             # Execute the SQL query
# #             query = "SELECT * FROM Ledger"
# #             cursor.execute(query)

# #             # Fetch column names
# #             columns = [col[0] for col in cursor.description]
# #             count = 0

# #             # Fetch each row safely one by one
# #             while True:
# #                 try:
# #                     row = cursor.fetchone()
# #                     if not row:
# #                         break

# #                     row_data = []
# #                     for val in row:
# #                         try:
# #                             row_data.append(str(val) if val is not None else "")
# #                         except Exception as conv_error:
# #                             self.stdout.write(self.style.WARNING(f"⚠️ Conversion error: {conv_error}"))
# #                             row_data.append("[Invalid]")

# #                     json_data = dict(zip(columns, row_data))

# #                     # Save to database
# #                     TallyData.objects.create(tally_json_data=json_data)
# #                     count += 1

# #                 except Exception as row_error:
# #                     self.stdout.write(self.style.WARNING(f"⚠️ Skipped row due to error: {row_error}"))

# #             # Close resources
# #             cursor.close()
# #             conn.close()

# #             self.stdout.write(self.style.SUCCESS(f"✅ Successfully stored {count} ledger rows."))

# #         except Exception as e:
# #             self.stdout.write(self.style.ERROR(f"❌ Connection or execution error: {e}"))


# # import pyodbc
# # import json
# # from datetime import datetime
# # from django.core.management.base import BaseCommand
# # from ledger.models import TallyData

# # class Command(BaseCommand):
# #     help = 'Fetch Ledger Data from Tally ODBC and save into DB as JSON (all values as strings)'

# #     def handle(self, *args, **kwargs):
# #         # Create error log file with timestamp
# #         timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
# #         error_log = []
        
# #         try:
# #             # Establish ODBC connection with NoPrompt option
# #             self.stdout.write("⏳ Establishing connection to Tally ODBC...")
# #             conn = pyodbc.connect(
# #                 r'Driver={Tally ODBC Driver64};Port=9000;UID=;PWD=;Interactive=0;',
# #                 autocommit=True
# #             )

# #             cursor = conn.cursor()

# #             # Execute the SQL query
# #             self.stdout.write("🔍 Executing query to fetch ledger data...")
# #             query = "SELECT * FROM Ledger"
# #             cursor.execute(query)

# #             # Fetch column names
# #             columns = [col[0] for col in cursor.description]
# #             count = 0
# #             skipped_count = 0
# #             error_count = 0

# #             # Get existing GUIDs to avoid duplicates
# #             self.stdout.write("🔄 Checking for existing records...")
# #             existing_guids = set(TallyData.objects.values_list('tally_json_data__$GUID', flat=True))

# #             # Fetch each row safely one by one
# #             self.stdout.write("📥 Processing ledger data...")
# #             while True:
# #                 try:
# #                     row = cursor.fetchone()
# #                     if not row:
# #                         break

# #                     # Convert row to dictionary
# #                     row_data = []
# #                     for val in row:
# #                         try:
# #                             row_data.append(str(val) if val is not None else "")
# #                         except Exception as conv_error:
# #                             row_data.append("[Invalid]")
# #                             self.stdout.write(self.style.WARNING(f"⚠️ Conversion error: {conv_error}"))

# #                     json_data = dict(zip(columns, row_data))
                    
# #                     # Check if GUID exists
# #                     guid = json_data.get('$GUID', '')
# #                     if not guid:
# #                         error_entry = {
# #                             'error': 'Missing GUID',
# #                             'data': json_data
# #                         }
# #                         error_log.append(error_entry)
# #                         error_count += 1
# #                         self.stdout.write(self.style.WARNING(f"⚠️ Skipped row with missing GUID"))
# #                         continue
                        
# #                     if guid in existing_guids:
# #                         skipped_count += 1
# #                         continue

# #                     try:
# #                         # Save to database
# #                         TallyData.objects.create(tally_json_data=json_data)
# #                         count += 1
# #                         if count % 100 == 0:  # Progress update every 100 records
# #                             self.stdout.write(f"✓ Processed {count} records...")
# #                     except Exception as save_error:
# #                         error_entry = {
# #                             'error': str(save_error),
# #                             'data': json_data
# #                         }
# #                         error_log.append(error_entry)
# #                         error_count += 1
# #                         self.stdout.write(self.style.WARNING(f"⚠️ Failed to save record: {save_error}"))

# #                 except Exception as row_error:
# #                     error_entry = {
# #                         'error': str(row_error),
# #                         'data': json_data if 'json_data' in locals() else None
# #                     }
# #                     error_log.append(error_entry)
# #                     error_count += 1
# #                     self.stdout.write(self.style.WARNING(f"⚠️ Skipped row due to error: {row_error}"))

# #             # Close resources
# #             cursor.close()
# #             conn.close()

# #             # Save error log if there were errors
# #             if error_log:
# #                 error_filename = f"tally_import_errors_{timestamp}.json"
# #                 with open(error_filename, 'w', encoding='utf-8') as f:
# #                     json.dump(error_log, f, indent=2, ensure_ascii=False)
# #                 self.stdout.write(self.style.WARNING(f"⚠️ Saved {error_count} errors to {error_filename}"))

# #             self.stdout.write(self.style.SUCCESS(
# #                 f"✅ Successfully stored {count} new ledger rows. "
# #                 f"Skipped {skipped_count} existing rows. "
# #                 f"Encountered {error_count} errors."
# #             ))

# #         except pyodbc.Error as e:
# #             error_entry = {
# #                 'error': str(e),
# #                 'data': None,
# #                 'type': 'connection_error'
# #             }
# #             error_log.append(error_entry)
            
# #             # Save connection error if it occurred
# #             error_filename = f"tally_import_errors_{timestamp}.json"
# #             with open(error_filename, 'w', encoding='utf-8') as f:
# #                 json.dump(error_log, f, indent=2, ensure_ascii=False)
                
# #             self.stdout.write(self.style.ERROR(f"❌ Connection error: {e}"))
# #             self.stdout.write(self.style.WARNING(f"⚠️ Saved error log to {error_filename}"))
        
# #         except Exception as e:
# #             error_entry = {
# #                 'error': str(e),
# #                 'data': None,
# #                 'type': 'unexpected_error'
# #             }
# #             error_log.append(error_entry)
            
# #             error_filename = f"tally_import_errors_{timestamp}.json"
# #             with open(error_filename, 'w', encoding='utf-8') as f:
# #                 json.dump(error_log, f, indent=2, ensure_ascii=False)
                
# #             self.stdout.write(self.style.ERROR(f"❌ Unexpected error: {e}"))
# #             self.stdout.write(self.style.WARNING(f"⚠️ Saved error log to {error_filename}"))


# # import pyodbc
# # import json
# # import os
# # from datetime import datetime
# # from django.core.management.base import BaseCommand
# # from ledger.models import TallyData
# # import win32com.client  # For DSN creation (pip install pywin32)
# # from pywinauto import Application  # For UI automation (pip install pywinauto)
# # import time

# # class Command(BaseCommand):
# #     help = 'Silently fetch ledger data from Tally Prime 6 without any popups'

# #     def handle(self, *args, **kwargs):
# #         # Setup error logging
# #         timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
# #         error_log = []
        
# #         try:
# #             # 1. First attempt - Direct silent connection
# #             self.stdout.write("Attempting silent direct connection...")
# #             conn = self._connect_silently()
            
# #             if conn:
# #                 self.stdout.write(self.style.SUCCESS("✅ Connected silently!"))
# #                 self._process_data(conn, error_log, timestamp)
# #                 return
            
# #             # 2. Second attempt - Create temporary DSN
# #             self.stdout.write("Falling back to temporary DSN...")
# #             conn = self._connect_via_temp_dsn()
            
# #             if conn:
# #                 self.stdout.write(self.style.SUCCESS("✅ Connected via temporary DSN!"))
# #                 self._process_data(conn, error_log, timestamp)
# #                 return
            
# #             # 3. Final attempt - UI automation
# #             self.stdout.write("Attempting UI automation to handle popups...")
# #             conn = self._connect_with_ui_automation()
            
# #             if conn:
# #                 self.stdout.write(self.style.SUCCESS("✅ Connected with UI automation!"))
# #                 self._process_data(conn, error_log, timestamp)
# #                 return
                
# #             raise ConnectionError("All connection methods failed")

# #         except Exception as e:
# #             error_msg = f"❌ Critical error: {str(e)}"
# #             self.stdout.write(self.style.ERROR(error_msg))
# #             error_log.append({'error': error_msg, 'data': None})
# #             self._save_error_log(error_log, timestamp)
# #             raise

# #     def _connect_silently(self):
# #         """First attempt - Direct silent connection with all suppress parameters"""
# #         conn_str = (
# #             r'DRIVER={Tally ODBC Driver64};'
# #             r'SERVER=localhost;'
# #             r'PORT=9000;'
# #             r'UID=;'
# #             r'PWD=;'
# #             r'SILENT=1;'
# #             r'NOPROMPT=1;'
# #             r'PROMPT=NO;'
# #             r'INTERACTIVE=0;'
# #             r'AUTOACCEPT=1;'
# #             r'SHOWTALLYWINDOW=0;'
# #             r'USEDEFAULTS=1;'
# #             r'ACCEPTDEFAULTS=1;'
# #         )
        
# #         try:
# #             return pyodbc.connect(conn_str, autocommit=True)
# #         except:
# #             return None

# #     def _connect_via_temp_dsn(self):
# #         """Second attempt - Create temporary DSN"""
# #         try:
# #             dsn_name = f"TempTallyDSN_{os.getpid()}"  # Unique name using process ID
            
# #             # Create system DSN
# #             conn = win32com.client.Dispatch("ODBC.DSN")
# #             conn.Create("System DSN", dsn_name)
# #             conn.Driver = "Tally ODBC Driver64"
# #             conn.Attributes = "Silent=1,NoPrompt=1,Server=localhost,Port=9000"
# #             conn.Save()
            
# #             # Connect using DSN
# #             return pyodbc.connect(f"DSN={dsn_name};", autocommit=True)
# #         except:
# #             return None

# #     def _connect_with_ui_automation(self):
# #         """Final attempt - Handle popups with UI automation"""
# #         try:
# #             # First try to connect (will trigger popup)
# #             conn_str = r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'
# #             conn = None
            
# #             # Start connection in a thread
# #             import threading
# #             def connect_thread():
# #                 nonlocal conn
# #                 try:
# #                     conn = pyodbc.connect(conn_str, autocommit=True)
# #                 except:
# #                     pass
            
# #             t = threading.Thread(target=connect_thread)
# #             t.start()
            
# #             # Handle the popup window
# #             time.sleep(2)  # Wait for popup to appear
# #             app = Application().connect(title="Tally ODBC Driver - Connection")
# #             dlg = app.window(title="Tally ODBC Driver - Connection")
# #             dlg.Next.click()  # Accept defaults
# #             t.join()  # Wait for connection thread
            
# #             return conn
# #         except:
# #             return None

# #     def _process_data(self, conn, error_log, timestamp):
# #         """Process the ledger data once connected"""
# #         cursor = conn.cursor()
# #         query = "SELECT * FROM Ledger"
# #         cursor.execute(query)

# #         columns = [col[0] for col in cursor.description]
# #         count = 0
# #         existing_guids = set(TallyData.objects.values_list('tally_json_data__$GUID', flat=True))

# #         self.stdout.write("📥 Processing ledger data...")
# #         while True:
# #             try:
# #                 row = cursor.fetchone()
# #                 if not row:
# #                     break

# #                 json_data = dict(zip(columns, [str(v) if v is not None else "" for v in row]))
# #                 guid = json_data.get('$GUID', '')
                
# #                 if not guid:
# #                     error_log.append({'error': 'Missing GUID', 'data': json_data})
# #                     continue
                    
# #                 if guid in existing_guids:
# #                     continue

# #                 TallyData.objects.create(tally_json_data=json_data)
# #                 count += 1
# #                 if count % 100 == 0:
# #                     self.stdout.write(f"✓ Processed {count} records...")

# #             except Exception as e:
# #                 error_log.append({'error': str(e), 'data': json_data if 'json_data' in locals() else None})

# #         cursor.close()
# #         conn.close()

# #         # Save error log if needed
# #         if error_log:
# #             self._save_error_log(error_log, timestamp)
# #             self.stdout.write(self.style.WARNING(f"⚠️ Saved {len(error_log)} errors to tally_import_errors_{timestamp}.json"))

# #         self.stdout.write(self.style.SUCCESS(
# #             f"✅ Success! Imported {count} new records. "
# #             f"Skipped {len(existing_guids)} existing records."
# #         ))

# #     def _save_error_log(self, error_log, timestamp):
# #         """Save error log to file"""
# #         error_filename = f"tally_import_errors_{timestamp}.json"
# #         with open(error_filename, 'w', encoding='utf-8') as f:
# #             json.dump(error_log, f, indent=2, ensure_ascii=False)



# import pyodbc
# import json
# import os
# from datetime import datetime, timedelta
# from django.core.management.base import BaseCommand
# from ledger.models import TallyData
# import win32com.client
# from pywinauto import Application
# import time
# from django.utils import timezone
# from django.db import transaction
# import threading

# class Command(BaseCommand):
#     help = 'Silently sync ledger data from Tally Prime 6 every 2 hours with full CRUD operations'

#     def handle(self, *args, **kwargs):
#         # Setup daily log file (one per day)
#         today = datetime.now().strftime("%Y%m%d")
#         log_filename = f"tally_sync_log_{today}.json"
#         error_filename = f"tally_sync_errors_{today}.json"
        
#         # Initialize log structure
#         log_data = self._init_log_file(log_filename)
#         error_log = self._load_error_file(error_filename)
        
#         current_run_time = datetime.now().isoformat()
#         log_data['last_run'] = current_run_time
#         run_details = {
#             'run_time': current_run_time,
#             'status': 'started',
#             'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
#         }

#         try:
#             # Attempt all connection methods
#             conn = None
#             connection_methods = [
#                 ('Direct Silent', self._connect_silently),
#                 ('Temporary DSN', self._connect_via_temp_dsn),
#                 ('UI Automation', self._connect_with_ui_automation)
#             ]
            
#             for method_name, method in connection_methods:
#                 self.stdout.write(f"[{current_run_time}] Attempting {method_name} connection...")
#                 conn = method()
#                 if conn:
#                     self.stdout.write(self.style.SUCCESS(f"✅ Connected via {method_name}!"))
#                     run_details['connection_method'] = method_name
#                     stats = self._full_sync_process(conn, error_log)
#                     run_details['stats'] = stats
#                     run_details['status'] = 'success'
                    
#                     # Update cumulative stats
#                     for k, v in stats.items():
#                         log_data['stats'][k] += v
#                     break

#             if not conn:
#                 raise ConnectionError("All connection methods failed")

#         except Exception as e:
#             error_msg = f"❌ Critical error: {str(e)}"
#             self.stdout.write(self.style.ERROR(error_msg))
#             run_details['status'] = 'failed'
#             run_details['error'] = error_msg
#             log_data['stats']['errors'] += 1
#             error_log.append({
#                 'timestamp': current_run_time,
#                 'error': error_msg,
#                 'type': 'system'
#             })
#         finally:
#             # Finalize logs
#             log_data['details'].append(run_details)
#             self._save_log_file(log_filename, log_data)
#             self._save_error_file(error_filename, error_log)
            
#             if run_details['status'] == 'success':
#                 self.stdout.write(self.style.SUCCESS(
#                     f"Sync complete! Added: {run_details['stats']['added']}, "
#                     f"Updated: {run_details['stats']['updated']}, "
#                     f"Deleted: {run_details['stats']['deleted']}, "
#                     f"Errors: {run_details['stats']['errors']}"
#                 ))

#     def _init_log_file(self, filename):
#         """Initialize or load daily log file"""
#         if os.path.exists(filename):
#             with open(filename, 'r') as f:
#                 return json.load(f)
#         else:
#             return {
#                 'start_date': datetime.now().strftime("%Y-%m-%d"),
#                 'start_time': datetime.now().isoformat(),
#                 'last_run': None,
#                 'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0},
#                 'details': []
#             }

#     def _load_error_file(self, filename):
#         """Load existing error file or return empty list"""
#         if os.path.exists(filename):
#             with open(filename, 'r') as f:
#                 return json.load(f)
#         return []

#     def _save_log_file(self, filename, data):
#         """Save log data to file"""
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=2, default=str)

#     def _save_error_file(self, filename, data):
#         """Save error data to file"""
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=2, default=str)

#     def _connect_silently(self):
#         """Direct silent connection with all suppress parameters"""
#         conn_str = (
#             r'DRIVER={Tally ODBC Driver64};'
#             r'SERVER=localhost;'
#             r'PORT=9000;'
#             r'UID=;'
#             r'PWD=;'
#             r'SILENT=1;'
#             r'NOPROMPT=1;'
#             r'PROMPT=NO;'
#             r'INTERACTIVE=0;'
#             r'AUTOACCEPT=1;'
#             r'SHOWTALLYWINDOW=0;'
#             r'USEDEFAULTS=1;'
#             r'ACCEPTDEFAULTS=1;'
#         )
#         try:
#             return pyodbc.connect(conn_str, autocommit=True)
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"Silent connection failed: {str(e)}"))
#             return None

#     def _connect_via_temp_dsn(self):
#         """Create temporary DSN for connection"""
#         try:
#             dsn_name = f"TempTallyDSN_{os.getpid()}"
            
#             # Create system DSN
#             conn = win32com.client.Dispatch("ODBC.DSN")
#             conn.Create("System DSN", dsn_name)
#             conn.Driver = "Tally ODBC Driver64"
#             conn.Attributes = "Silent=1,NoPrompt=1,Server=localhost,Port=9000"
#             conn.Save()
            
#             # Connect using DSN
#             return pyodbc.connect(f"DSN={dsn_name};", autocommit=True)
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"DSN connection failed: {str(e)}"))
#             return None
#         finally:
#             # Clean up DSN if it exists
#             try:
#                 if 'dsn_name' in locals():
#                     conn.Delete()
#             except:
#                 pass

#     def _connect_with_ui_automation(self):
#         """Handle popups with UI automation"""
#         try:
#             conn = None
#             conn_str = r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'
            
#             # Start connection in a thread
#             def connect_thread():
#                 nonlocal conn
#                 try:
#                     conn = pyodbc.connect(conn_str, autocommit=True)
#                 except Exception as e:
#                     self.stdout.write(self.style.WARNING(f"UI automation connection thread failed: {str(e)}"))

#             t = threading.Thread(target=connect_thread)
#             t.start()
            
#             # Handle the popup window
#             time.sleep(3)  # Wait for popup to appear
#             try:
#                 app = Application().connect(title="Tally ODBC Driver - Connection")
#                 dlg = app.window(title="Tally ODBC Driver - Connection")
#                 dlg.Next.click()  # Accept defaults
#             except Exception as e:
#                 self.stdout.write(self.style.WARNING(f"UI automation failed: {str(e)}"))

#             t.join(timeout=10)  # Wait for connection thread with timeout
#             return conn
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"UI automation connection failed: {str(e)}"))
#             return None

#     @transaction.atomic
#     def _full_sync_process(self, conn, error_log):
#         """Perform full sync with add/update/delete operations"""
#         cursor = conn.cursor()
#         query = "SELECT * FROM Ledger"
#         cursor.execute(query)

#         columns = [col[0] for col in cursor.description]
#         stats = {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
#         current_guids = set()
#         batch_size = 100
#         processed = 0
        
#         self.stdout.write("🔄 Starting full synchronization...")

#         # Phase 1: Process all records from Tally
#         while True:
#             try:
#                 row = cursor.fetchone()
#                 if not row:
#                     break

#                 processed += 1
#                 if processed % batch_size == 0:
#                     self.stdout.write(f"⏳ Processed {processed} records...")

#                 json_data = dict(zip(columns, [str(v) if v is not None else "" for v in row]))
#                 guid = json_data.get('$GUID', '')
                
#                 if not guid:
#                     stats['errors'] += 1
#                     error_log.append({
#                         'timestamp': datetime.now().isoformat(),
#                         'error': 'Missing GUID in record',
#                         'type': 'data',
#                         'data': json_data
#                     })
#                     continue
                    
#                 current_guids.add(guid)
                
#                 try:
#                     # Use update_or_create for atomic operation
#                     obj, created = TallyData.objects.update_or_create(
#                         tally_guid=guid,  # Assuming you have this field or use filter
#                         defaults={'tally_json_data': json_data}
#                     )
                    
#                     if created:
#                         stats['added'] += 1
#                     else:
#                         stats['updated'] += 1
#                 except Exception as e:
#                     stats['errors'] += 1
#                     error_log.append({
#                         'timestamp': datetime.now().isoformat(),
#                         'error': f"DB operation failed: {str(e)}",
#                         'type': 'database',
#                         'guid': guid
#                     })

#             except Exception as e:
#                 stats['errors'] += 1
#                 error_log.append({
#                     'timestamp': datetime.now().isoformat(),
#                     'error': f"Processing failed: {str(e)}",
#                     'type': 'processing'
#                 })

#         # Phase 2: Identify and delete removed records
#         try:
#             if current_guids:
#                 # Get all GUIDs we have in DB
#                 db_guids = set(TallyData.objects.values_list('tally_guid', flat=True))
                
#                 # Find GUIDs that are in DB but not in current Tally data
#                 guids_to_delete = db_guids - current_guids
                
#                 if guids_to_delete:
#                     deleted_info = TallyData.objects.filter(tally_guid__in=guids_to_delete).delete()
#                     stats['deleted'] = deleted_info[0]
#                     self.stdout.write(f"♻️ Deleted {stats['deleted']} removed records")
#         except Exception as e:
#             stats['errors'] += 1
#             error_log.append({
#                 'timestamp': datetime.now().isoformat(),
#                 'error': f"Deletion failed: {str(e)}",
#                 'type': 'deletion'
#             })

#         cursor.close()
#         conn.close()
#         return stats
    
# import pyodbc
# import json
# import os
# from datetime import datetime, timedelta
# from django.core.management.base import BaseCommand
# from ledger.models import TallyData
# import win32com.client
# from pywinauto import Application
# import time
# from django.utils import timezone
# from django.db import transaction
# import threading

# class Command(BaseCommand):
#     help = 'Silently sync ledger data from Tally Prime 6 every 2 hours with full CRUD operations'

#     def handle(self, *args, **kwargs):
#         # Setup daily log file
#         today = datetime.now().strftime("%Y%m%d")
#         log_filename = f"tally_sync_log_{today}.json"
#         error_filename = f"tally_sync_errors_{today}.json"

#         log_data = self._init_log_file(log_filename)
#         error_log = self._load_error_file(error_filename)

#         # Scheduler variables
#         last_sync_time = timezone.now() - timedelta(hours=2)
#         tally_closed_count = 0

#         self.stdout.write("⏳ Starting scheduler: 2-hour sync, 5-min Tally monitor...")

#         while True:
#             now = timezone.now()

#             # Check Tally status
#             is_tally_running = self._is_tally_running()
#             if not is_tally_running:
#                 tally_closed_count += 1
#                 self.stdout.write(self.style.WARNING(f"⚠️ Tally not running ({tally_closed_count}/2)"))
#             else:
#                 tally_closed_count = 0
#                 self.stdout.write(self.style.SUCCESS("✅ Tally is running."))

#             if tally_closed_count >= 2:
#                 self.stdout.write(self.style.ERROR("❌ Tally closed for 2 consecutive checks. Exiting..."))
#                 break

#             # Sync every 2 hours
#             if (now - last_sync_time) >= timedelta(hours=2):
#                 self.stdout.write(self.style.NOTICE("🕒 2 hours passed. Syncing with Tally..."))
#                 run_details = {
#                     'run_time': now.isoformat(),
#                     'status': 'started',
#                     'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
#                 }

#                 try:
#                     conn = self._connect_silently() or self._connect_via_temp_dsn() or self._connect_with_ui_automation()
#                     if not conn:
#                         raise ConnectionError("Failed to connect to Tally")

#                     stats = self._full_sync_process(conn, error_log)
#                     last_sync_time = now

#                     run_details.update({
#                         'status': 'success',
#                         'stats': stats,
#                         'connection_method': 'auto'
#                     })

#                     for k, v in stats.items():
#                         log_data['stats'][k] += v

#                 except Exception as e:
#                     error_msg = f"❌ Sync error: {str(e)}"
#                     self.stdout.write(self.style.ERROR(error_msg))
#                     run_details.update({
#                         'status': 'failed',
#                         'error': error_msg
#                     })
#                     error_log.append({
#                         'timestamp': now.isoformat(),
#                         'error': error_msg,
#                         'type': 'sync'
#                     })
#                     log_data['stats']['errors'] += 1

#                 log_data['details'].append(run_details)
#                 log_data['last_run'] = now.isoformat()
#                 self._save_log_file(log_filename, log_data)
#                 self._save_error_file(error_filename, error_log)

#                 if run_details['status'] == 'success':
#                     self.stdout.write(self.style.SUCCESS(
#                         f"✅ Sync done! Added: {stats['added']}, Updated: {stats['updated']}, "
#                         f"Deleted: {stats['deleted']}, Errors: {stats['errors']}"
#                     ))

#             # Wait 5 minutes
#             time.sleep(300)

#     def _is_tally_running(self):
#         """Check if Tally.exe is running"""
#         try:
#             tasks = os.popen('tasklist /FI "IMAGENAME eq tally.exe"').read()
#             return "tally.exe" in tasks
#         except:
#             return False

#     def _init_log_file(self, filename):
#         if os.path.exists(filename):
#             with open(filename, 'r') as f:
#                 return json.load(f)
#         return {
#             'start_date': datetime.now().strftime("%Y-%m-%d"),
#             'start_time': datetime.now().isoformat(),
#             'last_run': None,
#             'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0},
#             'details': []
#         }

#     def _load_error_file(self, filename):
#         if os.path.exists(filename):
#             with open(filename, 'r') as f:
#                 return json.load(f)
#         return []

#     def _save_log_file(self, filename, data):
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=2, default=str)

#     def _save_error_file(self, filename, data):
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=2, default=str)

#     def _connect_silently(self):
#         conn_str = (
#             r'DRIVER={Tally ODBC Driver64};'
#             r'SERVER=localhost;'
#             r'PORT=9000;'
#             r'UID=;PWD=;'
#             r'SILENT=1;NOPROMPT=1;PROMPT=NO;'
#             r'INTERACTIVE=0;AUTOACCEPT=1;SHOWTALLYWINDOW=0;'
#             r'USEDEFAULTS=1;ACCEPTDEFAULTS=1;'
#         )
#         try:
#             return pyodbc.connect(conn_str, autocommit=True)
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"Silent connect failed: {e}"))
#             return None

#     def _connect_via_temp_dsn(self):
#         try:
#             dsn_name = f"TempTallyDSN_{os.getpid()}"
#             conn = win32com.client.Dispatch("ODBC.DSN")
#             conn.Create("System DSN", dsn_name)
#             conn.Driver = "Tally ODBC Driver64"
#             conn.Attributes = "Silent=1,NoPrompt=1,Server=localhost,Port=9000"
#             conn.Save()
#             return pyodbc.connect(f"DSN={dsn_name};", autocommit=True)
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"DSN connect failed: {e}"))
#             return None
#         finally:
#             try:
#                 if 'conn' in locals():
#                     conn.Delete()
#             except:
#                 pass

#     def _connect_with_ui_automation(self):
#         try:
#             conn = None
#             conn_str = r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'

#             def connect_thread():
#                 nonlocal conn
#                 try:
#                     conn = pyodbc.connect(conn_str, autocommit=True)
#                 except Exception as e:
#                     self.stdout.write(self.style.WARNING(f"UI thread failed: {e}"))

#             t = threading.Thread(target=connect_thread)
#             t.start()

#             time.sleep(3)
#             try:
#                 app = Application().connect(title="Tally ODBC Driver - Connection")
#                 dlg = app.window(title="Tally ODBC Driver - Connection")
#                 dlg.Next.click()
#             except Exception as e:
#                 self.stdout.write(self.style.WARNING(f"UI automation failed: {e}"))

#             t.join(timeout=10)
#             return conn
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"UI connect failed: {e}"))
#             return None

#     @transaction.atomic
#     def _full_sync_process(self, conn, error_log):
#         cursor = conn.cursor()
#         query = "SELECT * FROM Ledger"
#         cursor.execute(query)

#         columns = [col[0] for col in cursor.description]
#         stats = {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
#         current_guids = set()

#         while True:
#             try:
#                 row = cursor.fetchone()
#                 if not row:
#                     break

#                 json_data = dict(zip(columns, [str(v) if v is not None else "" for v in row]))
#                 guid = json_data.get('$GUID', '')
#                 if not guid:
#                     stats['errors'] += 1
#                     error_log.append({
#                         'timestamp': datetime.now().isoformat(),
#                         'error': 'Missing GUID',
#                         'type': 'data',
#                         'data': json_data
#                     })
#                     continue

#                 current_guids.add(guid)
#                 try:
#                     obj, created = TallyData.objects.update_or_create(
#                         tally_guid=guid,
#                         defaults={'tally_json_data': json_data}
#                     )
#                     if created:
#                         stats['added'] += 1
#                     else:
#                         stats['updated'] += 1
#                 except Exception as e:
#                     stats['errors'] += 1
#                     error_log.append({
#                         'timestamp': datetime.now().isoformat(),
#                         'error': str(e),
#                         'type': 'db',
#                         'guid': guid
#                     })
#             except Exception as e:
#                 stats['errors'] += 1
#                 error_log.append({
#                     'timestamp': datetime.now().isoformat(),
#                     'error': str(e),
#                     'type': 'fetch'
#                 })

#         try:
#             db_guids = set(TallyData.objects.values_list('tally_guid', flat=True))
#             guids_to_delete = db_guids - current_guids
#             if guids_to_delete:
#                 deleted_info = TallyData.objects.filter(tally_guid__in=guids_to_delete).delete()
#                 stats['deleted'] = deleted_info[0]
#         except Exception as e:
#             stats['errors'] += 1
#             error_log.append({
#                 'timestamp': datetime.now().isoformat(),
#                 'error': f"Deletion error: {str(e)}",
#                 'type': 'deletion'
#             })

#         cursor.close()
#         conn.close()
#         return stats


# import pyodbc
# import json
# import os
# from datetime import datetime, timedelta
# from django.core.management.base import BaseCommand
# from ledger.models import TallyData
# import win32com.client
# from pywinauto import Application
# import time
# from django.utils import timezone
# from django.db import transaction
# import threading

# class Command(BaseCommand):
#     help = 'Silently sync ledger data from Tally Prime 6 every 2 hours with full CRUD operations'

#     def handle(self, *args, **kwargs):
#         today = datetime.now().strftime("%Y%m%d")
#         log_filename = f"tally_sync_log_{today}.json"
#         error_filename = f"tally_sync_errors_{today}.json"

#         log_data = self._init_log_file(log_filename)
#         error_log = self._load_error_file(error_filename)

#         last_sync_time = timezone.now() - timedelta(minutes=1)
#         tally_closed_count = 0

#         self.stdout.write("\u23f3 Starting scheduler: 2-hour sync, 5-min Tally monitor...")

#         while True:
#             now = timezone.now()
#             is_tally_running = self._is_tally_running()
#             if not is_tally_running:
#                 tally_closed_count += 1
#                 self.stdout.write(self.style.WARNING(f"⚠️ Tally not running ({tally_closed_count}/2)"))
#             else:
#                 tally_closed_count = 0
#                 self.stdout.write(self.style.SUCCESS("✅ Tally is running."))

#             if tally_closed_count >= 2:
#                 self.stdout.write(self.style.ERROR("❌ Tally closed for 2 consecutive checks. Exiting..."))
#                 break

#             if (now - last_sync_time) >= timedelta(minutes=1):
#                 self.stdout.write(self.style.NOTICE("🕒 2 hours passed. Syncing with Tally..."))
#                 run_details = {
#                     'run_time': now.isoformat(),
#                     'status': 'started',
#                     'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
#                 }

#                 try:
#                     conn = self._connect_silently() or self._connect_via_temp_dsn() or self._connect_with_ui_automation()
#                     if not conn:
#                         raise ConnectionError("Failed to connect to Tally")

#                     stats = self._full_sync_process(conn, error_log)
#                     last_sync_time = now

#                     run_details.update({
#                         'status': 'success',
#                         'stats': stats,
#                         'connection_method': 'auto'
#                     })

#                     for k, v in stats.items():
#                         log_data['stats'][k] += v

#                 except Exception as e:
#                     error_msg = f"❌ Sync error: {str(e)}"
#                     self.stdout.write(self.style.ERROR(error_msg))
#                     run_details.update({
#                         'status': 'failed',
#                         'error': error_msg
#                     })
#                     error_log.append({
#                         'timestamp': now.isoformat(),
#                         'error': error_msg,
#                         'type': 'sync'
#                     })
#                     log_data['stats']['errors'] += 1

#                 log_data['details'].append(run_details)
#                 log_data['last_run'] = now.isoformat()
#                 self._save_log_file(log_filename, log_data)
#                 self._save_error_file(error_filename, error_log)

#                 if run_details['status'] == 'success':
#                     self.stdout.write(self.style.SUCCESS(
#                         f"✅ Sync done! Added: {stats['added']}, Updated: {stats['updated']}, "
#                         f"Deleted: {stats['deleted']}, Errors: {stats['errors']}"
#                     ))

#             time.sleep(300)

#     def _is_tally_running(self):
#         try:
#             tasks = os.popen('tasklist /FI "IMAGENAME eq tally.exe"').read()
#             return "tally.exe" in tasks
#         except:
#             return False

#     def _init_log_file(self, filename):
#         if os.path.exists(filename):
#             with open(filename, 'r') as f:
#                 return json.load(f)
#         return {
#             'start_date': datetime.now().strftime("%Y-%m-%d"),
#             'start_time': datetime.now().isoformat(),
#             'last_run': None,
#             'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0},
#             'details': []
#         }

#     def _load_error_file(self, filename):
#         if os.path.exists(filename):
#             with open(filename, 'r') as f:
#                 return json.load(f)
#         return []

#     def _save_log_file(self, filename, data):
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=2, default=str)

#     def _save_error_file(self, filename, data):
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=2, default=str)

#     def _connect_silently(self):
#         conn_str = (
#             r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'
#             r'UID=;PWD=;SILENT=1;NOPROMPT=1;PROMPT=NO;'
#             r'INTERACTIVE=0;AUTOACCEPT=1;SHOWTALLYWINDOW=0;'
#             r'USEDEFAULTS=1;ACCEPTDEFAULTS=1;'
#         )
#         try:
#             return pyodbc.connect(conn_str, autocommit=True)
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"Silent connect failed: {e}"))
#             return None

#     def _connect_via_temp_dsn(self):
#         try:
#             dsn_name = f"TempTallyDSN_{os.getpid()}"
#             conn = win32com.client.Dispatch("ODBC.DSN")
#             conn.Create("System DSN", dsn_name)
#             conn.Driver = "Tally ODBC Driver64"
#             conn.Attributes = "Silent=1,NoPrompt=1,Server=localhost,Port=9000"
#             conn.Save()
#             return pyodbc.connect(f"DSN={dsn_name};", autocommit=True)
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"DSN connect failed: {e}"))
#             return None
#         finally:
#             try:
#                 if 'conn' in locals():
#                     conn.Delete()
#             except:
#                 pass

#     def _connect_with_ui_automation(self):
#         try:
#             conn = None
#             conn_str = r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'
#             def connect_thread():
#                 nonlocal conn
#                 try:
#                     conn = pyodbc.connect(conn_str, autocommit=True)
#                 except Exception as e:
#                     self.stdout.write(self.style.WARNING(f"UI thread failed: {e}"))

#             t = threading.Thread(target=connect_thread)
#             t.start()

#             time.sleep(3)
#             try:
#                 app = Application().connect(title="Tally ODBC Driver - Connection")
#                 dlg = app.window(title="Tally ODBC Driver - Connection")
#                 dlg.Next.click()
#             except Exception as e:
#                 self.stdout.write(self.style.WARNING(f"UI automation failed: {e}"))

#             t.join(timeout=10)
#             return conn
#         except Exception as e:
#             self.stdout.write(self.style.WARNING(f"UI connect failed: {e}"))
#             return None

#     @transaction.atomic
#     def _full_sync_process(self, conn, error_log):
#         latest_db_time = TallyData.objects.order_by('-updated_at').values_list('updated_at', flat=True).first()

#         cursor = conn.cursor()
#         updated_filter = latest_db_time.strftime("%Y%m%d") if latest_db_time else None
#         query = "SELECT * FROM Ledger"
#         if updated_filter:
#             query += f" WHERE $UpdatedDateTime > '{updated_filter}'"

#         cursor.execute(query)

#         columns = [col[0] for col in cursor.description]
#         stats = {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
#         current_guids = set()

#         while True:
#             try:
#                 row = cursor.fetchone()
#                 if not row:
#                     break

#                 json_data = dict(zip(columns, [str(v) if v is not None else "" for v in row]))
#                 guid = json_data.get('$GUID', '')

#                 if not guid:
#                     stats['errors'] += 1
#                     error_log.append({
#                         'timestamp': datetime.now().isoformat(),
#                         'error': 'Missing GUID',
#                         'type': 'data',
#                         'data': json_data
#                     })
#                     continue

#                 current_guids.add(guid)
#                 try:
#                     obj, created = TallyData.objects.update_or_create(
#                         tally_guid=guid,
#                         defaults={'tally_json_data': json_data}
#                     )
#                     if created:
#                         stats['added'] += 1
#                     else:
#                         stats['updated'] += 1
#                 except Exception as e:
#                     stats['errors'] += 1
#                     error_log.append({
#                         'timestamp': datetime.now().isoformat(),
#                         'error': str(e),
#                         'type': 'db',
#                         'guid': guid
#                     })
#             except Exception as e:
#                 stats['errors'] += 1
#                 error_log.append({
#                     'timestamp': datetime.now().isoformat(),
#                     'error': str(e),
#                     'type': 'fetch'
#                 })

#         # try:
#         #     db_guids = set(TallyData.objects.values_list('tally_guid', flat=True))
#         #     guids_to_delete = db_guids - current_guids
#         #     if guids_to_delete:
#         #         deleted_info = TallyData.objects.filter(tally_guid__in=guids_to_delete).delete()
#         #         stats['deleted'] = deleted_info[0]
#         # except Exception as e:
#         #     stats['errors'] += 1
#         #     error_log.append({
#         #         'timestamp': datetime.now().isoformat(),
#         #         'error': f"Deletion error: {str(e)}",
#         #         'type': 'deletion'
#         #     })

#         cursor.close()
#         conn.close()
#         return stats


import pyodbc
import json
import os
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from ledger.models import TallyData
import win32com.client
from pywinauto import Application
import time
from django.utils import timezone
from django.db import transaction
import threading

class Command(BaseCommand):
    help = 'Silently sync ledger data from Tally Prime 6 every 2 hours with full CRUD operations'

    def handle(self, *args, **kwargs):
        today = datetime.now().strftime("%Y%m%d")
        log_filename = f"tally_sync_log_{today}.json"
        error_filename = f"tally_sync_errors_{today}.json"

        log_data = self._init_log_file(log_filename)
        error_log = self._load_error_file(error_filename)

        last_sync_time = timezone.now() - timedelta(hours=2)
        tally_closed_count = 0

        self.stdout.write("\u23f3 Starting scheduler: 2-hour sync, 5-min Tally monitor...")

        while True:
            now = timezone.now()
            is_tally_running = self._is_tally_running()
            if not is_tally_running:
                tally_closed_count += 1
                self.stdout.write(self.style.WARNING(f"⚠️ Tally not running ({tally_closed_count}/2)"))
            else:
                tally_closed_count = 0
                self.stdout.write(self.style.SUCCESS("✅ Tally is running."))

            if tally_closed_count >= 2:
                self.stdout.write(self.style.ERROR("❌ Tally closed for 2 consecutive checks. Exiting..."))
                break

            if (now - last_sync_time) >= timedelta(hours=2):
                self.stdout.write(self.style.NOTICE("🕒 2 hours passed. Syncing with Tally..."))
                run_details = {
                    'run_time': now.isoformat(),
                    'status': 'started',
                    'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
                }

                try:
                    conn = self._connect_silently() or self._connect_via_temp_dsn() or self._connect_with_ui_automation()
                    if not conn:
                        raise ConnectionError("Failed to connect to Tally")

                    stats = self._full_sync_process(conn, error_log)
                    last_sync_time = now

                    run_details.update({
                        'status': 'success',
                        'stats': stats,
                        'connection_method': 'auto'
                    })

                    for k, v in stats.items():
                        log_data['stats'][k] += v

                except Exception as e:
                    error_msg = f"❌ Sync error: {str(e)}"
                    self.stdout.write(self.style.ERROR(error_msg))
                    run_details.update({
                        'status': 'failed',
                        'error': error_msg
                    })
                    error_log.append({
                        'timestamp': now.isoformat(),
                        'error': error_msg,
                        'type': 'sync'
                    })
                    log_data['stats']['errors'] += 1

                log_data['details'].append(run_details)
                log_data['last_run'] = now.isoformat()
                self._save_log_file(log_filename, log_data)
                self._save_error_file(error_filename, error_log)

                if run_details['status'] == 'success':
                    self.stdout.write(self.style.SUCCESS(
                        f"✅ Sync done! Added: {stats['added']}, Updated: {stats['updated']}, "
                        f"Deleted: {stats['deleted']}, Errors: {stats['errors']}"
                    ))

            time.sleep(300)

    def _is_tally_running(self):
        try:
            tasks = os.popen('tasklist /FI "IMAGENAME eq tally.exe"').read()
            return "tally.exe" in tasks
        except:
            return False

    def _init_log_file(self, filename):
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                return json.load(f)
        return {
            'start_date': datetime.now().strftime("%Y-%m-%d"),
            'start_time': datetime.now().isoformat(),
            'last_run': None,
            'stats': {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0},
            'details': []
        }

    def _load_error_file(self, filename):
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                return json.load(f)
        return []

    def _save_log_file(self, filename, data):
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2, default=str)

    def _save_error_file(self, filename, data):
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2, default=str)

    def _connect_silently(self):
        conn_str = (
            r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'
            r'UID=;PWD=;SILENT=1;NOPROMPT=1;PROMPT=NO;'
            r'INTERACTIVE=0;AUTOACCEPT=1;SHOWTALLYWINDOW=0;'
            r'USEDEFAULTS=1;ACCEPTDEFAULTS=1;'
        )
        try:
            return pyodbc.connect(conn_str, autocommit=True)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Silent connect failed: {e}"))
            return None

    def _connect_via_temp_dsn(self):
        try:
            dsn_name = f"TempTallyDSN_{os.getpid()}"
            conn = win32com.client.Dispatch("ODBC.DSN")
            conn.Create("System DSN", dsn_name)
            conn.Driver = "Tally ODBC Driver64"
            conn.Attributes = "Silent=1,NoPrompt=1,Server=localhost,Port=9000"
            conn.Save()
            return pyodbc.connect(f"DSN={dsn_name};", autocommit=True)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"DSN connect failed: {e}"))
            return None
        finally:
            try:
                if 'conn' in locals():
                    conn.Delete()
            except:
                pass

    def _connect_with_ui_automation(self):
        try:
            conn = None
            conn_str = r'DRIVER={Tally ODBC Driver64};SERVER=localhost;PORT=9000;'
            def connect_thread():
                nonlocal conn
                try:
                    conn = pyodbc.connect(conn_str, autocommit=True)
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"UI thread failed: {e}"))

            t = threading.Thread(target=connect_thread)
            t.start()

            time.sleep(3)
            try:
                app = Application().connect(title="Tally ODBC Driver - Connection")
                dlg = app.window(title="Tally ODBC Driver - Connection")
                dlg.Next.click()
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"UI automation failed: {e}"))

            t.join(timeout=10)
            return conn
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"UI connect failed: {e}"))
            return None

    @transaction.atomic
    def _full_sync_process(self, conn, error_log):
        latest_db_time = TallyData.objects.order_by('-updated_at').values_list('updated_at', flat=True).first()

        cursor = conn.cursor()
        updated_filter = latest_db_time.strftime("%Y%m%d") if latest_db_time else None
        query = "SELECT * FROM Ledger"
        if updated_filter:
            query += f" WHERE $UpdatedDateTime > '{updated_filter}'"

        cursor.execute(query)

        columns = [col[0] for col in cursor.description]
        stats = {'added': 0, 'updated': 0, 'deleted': 0, 'errors': 0}
        current_guids = set()
        json_data = None
        guid = None
        while True:
            try:
                row = cursor.fetchone()
                if not row:
                    break

                json_data = dict(zip(columns, [str(v) if v is not None else "" for v in row]))
                guid = json_data.get('$GUID', '')

                if not guid:
                    stats['errors'] += 1
                    error_log.append({
                        'timestamp': datetime.now().isoformat(),
                        'error': 'Missing GUID',
                        'type': 'data',
                        'data': json_data
                    })
                    continue

                current_guids.add(guid)
                try:
                    obj, created = TallyData.objects.update_or_create(
                        tally_guid=guid,
                        defaults={'tally_json_data': json_data}
                    )
                    if created:
                        stats['added'] += 1
                    else:
                        stats['updated'] += 1
                except Exception as e:
                    stats['errors'] += 1
                    error_log.append({
                        'timestamp': datetime.now().isoformat(),
                        'error': str(e),
                        'type': 'db',
                        'guid': guid,
                        'data': json_data
                    })
            except Exception as e:
                stats['errors'] += 1
                error_log.append({
                    'timestamp': datetime.now().isoformat(),
                    'error': str(e),
                    'type': 'fetch',
                    'guid': guid,
                    'data': json_data
                })

        # try:
        #     db_guids = set(TallyData.objects.values_list('tally_guid', flat=True))
        #     guids_to_delete = db_guids - current_guids
        #     if guids_to_delete:
        #         deleted_info = TallyData.objects.filter(tally_guid__in=guids_to_delete).delete()
        #         stats['deleted'] = deleted_info[0]
        # except Exception as e:
        #     stats['errors'] += 1
        #     error_log.append({
        #         'timestamp': datetime.now().isoformat(),
        #         'error': f"Deletion error: {str(e)}",
        #         'type': 'deletion'
        #     })

        cursor.close()
        conn.close()
        return stats

