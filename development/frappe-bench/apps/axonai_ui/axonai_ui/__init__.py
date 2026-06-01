import frappe
import os

__version__ = "0.0.1"

@frappe.whitelist(allow_guest=True)
def log_browser_error(error_message):
    # Log to Frappe logger
    frappe.logger().error(f"[Browser Error] {error_message}")
    
    # Write to a direct logs/browser.log file for easy debugging
    try:
        log_dir = os.path.abspath(os.path.join(frappe.get_app_path("axonai_ui"), "..", "..", "..", "logs"))
        os.makedirs(log_dir, exist_ok=True)
        log_file = os.path.join(log_dir, "browser.log")
        with open(log_file, "a") as f:
            f.write(f"[{frappe.utils.now()}] {error_message}\n\n")
    except Exception as e:
        pass
        
    return {"status": "ok"}
