# How to run this project

**Pre-reqs:** Make sure you have `python` installed on your machine.


1. While on root folder, run following command

```
python data_processing.py
```

2. This should generate three csv files and one txt file under `src/main/resources`
3. Run spring-boot project using maven or IDE

```
mvn clean install
mvn spring-boot:run
```

4. Hit `http://localhost:8080/` to see API documentation


`Note`: Python script can be found under root directory - `data_processing.py`