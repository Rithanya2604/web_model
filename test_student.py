
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

try:
    # Open website
    driver.get("http://127.0.0.1:5500/index.html")
    print("TEST 1: Website opened")

    # Open Add Student page
    driver.find_element(
        By.XPATH, "//button[contains(.,'Add Student')]"
    ).click()

    # Enter student details
    driver.find_element(
        By.XPATH, "//input[@ng-model='form.name']"
    ).send_keys("Arun")

    driver.find_element(
        By.XPATH, "//input[@ng-model='form.regno']"
    ).send_keys("SEL1001")

    driver.find_element(
        By.XPATH, "//input[@ng-model='form.department']"
    ).send_keys("IT")

    # Submit form
    driver.find_element(
        By.XPATH, "//form//button[@type='submit']"
    ).click()

    # Accept success alert
    wait.until(EC.alert_is_present())
    driver.switch_to.alert.accept()

    print("TEST 2: Student added")

    # Open View Students page
    driver.find_element(
        By.XPATH, "//button[contains(.,'View Students')]"
    ).click()

    # Wait until student appears in table
    wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//td[contains(text(),'Arun')]")
        )
    )

    print("TEST 3: Student displayed in table")

    # Search student
    driver.find_element(
        By.XPATH, "//input[@ng-model='searchName']"
    ).send_keys("Arun")

    driver.find_element(
        By.XPATH, "//button[contains(.,'Search')]"
    ).click()

    # Verify search result
    wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//td[contains(text(),'Arun')]")
        )
    )

    print("TEST 4: Student search completed")

except Exception as e:
    print("Test failed:", e)

finally:
    driver.quit()
