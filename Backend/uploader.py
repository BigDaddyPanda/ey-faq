import os
from flask import Flask, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from uuid import uuid4
from config import app,UPLOAD_FOLDER

# UPLOAD_FOLDER = r"D:\Work\Nizar Vue\Backend\img"
# if not os.path.isdir(UPLOAD_FOLDER):
#     os.mkdir(UPLOAD_FOLDER)
ALLOWED_EXTENSIONS = set(["txt", "pdf", "png", "jpg", "jpeg", "gif"])

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/downloader", methods=["GET", "POST"])
def download(filename="###"):
    if filename == "###":
        filename = request.args.get("filename")
    return send_from_directory(directory=UPLOAD_FOLDER, filename=filename)


@app.route("/uploader", methods=["GET", "POST"])
def upload_file():
    print("ez", request.files)
    if request.method == "POST":
        # check if the post request has the file part
        if "file" not in request.files:
            print("No file part")
            return redirect(request.url)
        file = request.files["file"]
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == "":
            print("No selected file")
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = str(uuid4())+"."+file.filename.rsplit(".", 1)[1].lower()
            # filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            # return redirect(url_for("upload_file", filename=filename))
            return jsonify(url=f"http://127.0.0.1:5000/downloader?filename={filename}")
    return """
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    """


@app.route("/users")
def get_users():
    response = {"total":200,"per_page":15,"current_page":1,"last_page":14,"next_page_url":"https://vuetable.ratiw.net/api/users?page=2","prev_page_url":None,"from":1,"to":15,"data":[{"id":1,"name":"Noelia O'Kon","nickname":"asperiores","email":"otho.smitham@example.com","birthdate":"1978-06-28 00:00:00","gender":"F","salary":"13098.00","group_id":2,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":40,"group":{"id":2,"name":"Exec","description":"Executives"},"address":{"id":1,"user_id":1,"line1":"0888 Aniyah LocksnLake Bridie, NJ 51086","line2":"Cayman Islands","zipcode":"92991-2805","mobile":"1-742-816-9238x848","fax":"(484)438-4697x8638"}},{"id":2,"name":"Mr. Enid Von PhD","nickname":"alias","email":"pollich.cecilia@example.com","birthdate":"1990-09-18 00:00:00","gender":"M","salary":"35978.00","group_id":4,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":28,"group":{"id":4,"name":"Sup","description":"Supervisors"},"address":{"id":2,"user_id":2,"line1":"59732 Iva Spur Suite 468nEast Hortenseton, VA 70087","line2":"Cayman Islands","zipcode":"41967","mobile":"1-913-407-7558x503","fax":"(388)906-8002"}},{"id":3,"name":"Colton Koch","nickname":"id","email":"little.myrna@example.net","birthdate":"1968-10-29 00:00:00","gender":"F","salary":"26278.00","group_id":3,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":50,"group":{"id":3,"name":"Mgr","description":"Managers"},"address":{"id":3,"user_id":3,"line1":"539 Conn Locks Suite 801nTobinfort, IL 37047-5508","line2":"Antigua and Barbuda","zipcode":"51722-4502","mobile":"557.845.1830x844","fax":"1-831-304-7444x73027"}},{"id":4,"name":"Gregory Vandervort","nickname":"vel","email":"dock47@example.org","birthdate":"1989-12-12 00:00:00","gender":"M","salary":"25537.00","group_id":3,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":29,"group":{"id":3,"name":"Mgr","description":"Managers"},"address":{"id":4,"user_id":4,"line1":"916 Rosemary ForgenKreigerton, MT 24207","line2":"Uganda","zipcode":"67639-6707","mobile":"766.431.9121","fax":"(154)336-3674x08451"}},{"id":5,"name":"Miss Rahsaan Heaney IV","nickname":"qui","email":"ugrady@example.org","birthdate":"1995-11-27 00:00:00","gender":"F","salary":"49003.00","group_id":2,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":23,"group":{"id":2,"name":"Exec","description":"Executives"},"address":{"id":5,"user_id":5,"line1":"91792 Kertzmann Prairie Apt. 376nLake Nakiaville, DC 98189","line2":"Jamaica","zipcode":"10101-1450","mobile":"07507519787","fax":"+24(9)5120507985"}},{"id":6,"name":"Ms. Crystel Zemlak IV","nickname":"reiciendis","email":"amari.rau@example.com","birthdate":"1968-09-12 00:00:00","gender":"F","salary":"12383.00","group_id":4,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":50,"group":{"id":4,"name":"Sup","description":"Supervisors"},"address":{"id":6,"user_id":6,"line1":"97650 Scot Haven Apt. 160nCrawfordmouth, ME 39767-7003","line2":"Finland","zipcode":"88917","mobile":"1-851-069-9234x9566","fax":"(048)445-4691x33356"}},{"id":7,"name":"Nona McDermott","nickname":"quaerat","email":"adrien.baumbach@example.org","birthdate":"1985-10-01 00:00:00","gender":"F","salary":"18512.00","group_id":4,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":33,"group":{"id":4,"name":"Sup","description":"Supervisors"},"address":{"id":7,"user_id":7,"line1":"4332 Alvina RadialnPort Darbyville, IA 63357","line2":"Barbados","zipcode":"79679","mobile":"(736)058-1324","fax":"002.234.8466x49816"}},{"id":8,"name":"Miss Genoveva Murazik V","nickname":"rerum","email":"ohettinger@example.net","birthdate":"1988-10-19 00:00:00","gender":"F","salary":"31209.00","group_id":2,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":30,"group":{"id":2,"name":"Exec","description":"Executives"},"address":{"id":8,"user_id":8,"line1":"96418 Ritchie Mall Apt. 215nLake Jessyca, VT 65970-8256","line2":"Netherlands Antilles","zipcode":"94649-6628","mobile":"472.825.7183","fax":"400-507-7463"}},{"id":9,"name":"Beulah Huels","nickname":"non","email":"stefan99@example.com","birthdate":"1963-09-04 00:00:00","gender":"F","salary":"36920.00","group_id":5,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":55,"group":{"id":5,"name":"Emp","description":"Employees"},"address":{"id":9,"user_id":9,"line1":"18890 Carroll Lakes Suite 355nUptonchester, UT 94878-0739","line2":"Hong Kong","zipcode":"91204","mobile":"831.652.0832","fax":"(688)788-8947"}},{"id":10,"name":"Zoe Klein","nickname":"ex","email":"ejacobson@example.org","birthdate":"1990-04-19 00:00:00","gender":"F","salary":"35616.00","group_id":3,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":29,"group":{"id":3,"name":"Mgr","description":"Managers"},"address":{"id":10,"user_id":10,"line1":"6721 Nader SummitnLake Alana, MS 84476","line2":"Reunion","zipcode":"77124-1459","mobile":"1-129-438-6148","fax":"(913)441-3846"}},{"id":11,"name":"Vickie Kiehn","nickname":"assumenda","email":"ayost@example.com","birthdate":"1988-04-20 00:00:00","gender":"F","salary":"30790.00","group_id":3,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":31,"group":{"id":3,"name":"Mgr","description":"Managers"},"address":{"id":11,"user_id":11,"line1":"763 McCullough VillenNew Thomasstad, HI 64611","line2":"Oman","zipcode":"00642","mobile":"1-296-172-2126x275","fax":"(559)203-8694"}},{"id":12,"name":"Elwyn Herzog","nickname":"praesentium","email":"ckassulke@example.net","birthdate":"1990-01-22 00:00:00","gender":"M","salary":"35785.00","group_id":1,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":29,"group":{"id":1,"name":"Admin","description":"Administrators"},"address":{"id":12,"user_id":12,"line1":"65641 Baron Spurs Suite 988nNorth Ivah, IA 92235","line2":"Nepal","zipcode":"90316-7411","mobile":"064.482.9432x9456","fax":"05936098280"}},{"id":13,"name":"Selena Hettinger","nickname":"et","email":"bashirian.hyman@example.net","birthdate":"1981-10-01 00:00:00","gender":"F","salary":"31836.00","group_id":5,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":37,"group":{"id":5,"name":"Emp","description":"Employees"},"address":{"id":13,"user_id":13,"line1":"42272 Stoltenberg Points Suite 006nLake Dustin, NH 70213-2043","line2":"Uganda","zipcode":"60996-2982","mobile":"(508)122-5892","fax":"356-682-2023x07379"}},{"id":14,"name":"Edwin Beier","nickname":"eos","email":"janis71@example.org","birthdate":"1978-10-13 00:00:00","gender":"M","salary":"11902.00","group_id":1,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":40,"group":{"id":1,"name":"Admin","description":"Administrators"},"address":{"id":14,"user_id":14,"line1":"362 Trantow Loop Apt. 150nLake Marafurt, DC 27926","line2":"Gabon","zipcode":"36943-1099","mobile":"033-386-4972x26066","fax":"1-363-037-1381"}},{"id":15,"name":"Lexi Braun MD","nickname":"autem","email":"dusty74@example.net","birthdate":"1971-12-07 00:00:00","gender":"F","salary":"11927.00","group_id":4,"created_at":"2017-01-01 07:21:10","updated_at":"2017-01-01 07:21:10","age":47,"group":{"id":4,"name":"Sup","description":"Supervisors"},"address":{"id":15,"user_id":15,"line1":"6737 Schimmel Crossing Suite 720nShieldsberg, AK 44558","line2":"Tanzania","zipcode":"75615","mobile":"338.920.3112","fax":"(467)912-6668"}}]}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
