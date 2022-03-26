let pro_per_val,
    carb_per_val,
    fat_per_val,
    BMR,
    AMR,
    carbs,
    protein,
    fat,
    weight,
    gender,
    height,
    ft,
    inch,
    age,
    activity_factor,
    unit,
    percentage,
    protein_per,
    carbs_per,
    fat_per,
    goal,
    meal_num,
    water_intake,
    daily_workout_time;

function changeMacroPerc() {
    pro_per_val = parseInt($("#pro").val());
    carb_per_val = parseInt($("#carb").val());
    fat_per_val = parseInt($("#fat").val());
}
changeMacroPerc();

$("#unit").change(function () {
    if ($("#unit").val() == "imperial") {
        $("#weight").attr("placeholder", "in lb");
        $("#height").attr("placeholder", "ft");
        $("#inch").attr("class", "form-control mt-2");
    } else {
        $("#weight").attr("placeholder", "in kg");
        $("#height").attr("placeholder", "in cm");
        $("#inch").attr("class", "form-control mt-2 d-none");
    }
});

$("#goal").change(function () {
    if ($("#goal").val() == "loss") {
        $("#cal_perc").val(-10);
        $("#cal_out").val("-10%");
        $("#pro").val(45);
        $("#pro_out").val("Protein 45%");
        $("#carb").val(20);
        $("#carb_out").val("Carbs 20%");
        $("#fat").val(35);
        $("#fat_out").val("Fat 35%");
    } else if ($("#goal").val() == "gain") {
        $("#cal_perc").val(10);
        $("#cal_out").val("10%");
        $("#pro").val(25);
        $("#pro_out").val("Protein 25%");
        $("#carb").val(55);
        $("#carb_out").val("Carbs 55%");
        $("#fat").val(20);
        $("#fat_out").val("Fat 20%");
    } else {
        $("#cal_perc").val(0);
        $("#cal_out").val("0%");
        $("#pro").val(30);
        $("#pro_out").val("Protein 30%");
        $("#carb").val(40);
        $("#carb_out").val("Carbs 40%");
        $("#fat").val(30);
        $("#fat_out").val("Fat 30%");
    }

    changeMacroPerc();
});

$("#cal_perc").change(function () {
    if ($("#cal_perc").val() > 0) {
        $("#goal").val("gain");
        $("#pro").val(25);
        $("#pro_out").val("Protein 25%");
        $("#carb").val(55);
        $("#carb_out").val("Carbs 55%");
        $("#fat").val(20);
        $("#fat_out").val("Fat 20%");
    } else if ($("#cal_perc").val() < 0) {
        $("#goal").val("loss");
        $("#pro").val(45);
        $("#pro_out").val("Protein 45%");
        $("#carb").val(20);
        $("#carb_out").val("Carbs 20%");
        $("#fat").val(35);
        $("#fat_out").val("Fat 35%");
    } else {
        $("#goal").val("");
        $("#pro").val(30);
        $("#pro_out").val("Protein 30%");
        $("#carb").val(40);
        $("#carb_out").val("Carbs 40%");
        $("#fat").val(30);
        $("#fat_out").val("Fat 30%");
    }

    $("#cal_out").val($("#cal_perc").val() + "%");

    changeMacroPerc();
});

function proInp(val) {
    document.getElementById('pro_out').innerHTML = 'Protein ' + val + '%';
    if (pro_per_val < val) {
        carbDec(val - pro_per_val, true);
    } else {
        carbInc(pro_per_val - val);
    }

    pro_per_val = parseInt(val);
}

function carbInp(val) {
    document.getElementById('carb_out').innerHTML = 'Carbs ' + val + '%';
    if (carb_per_val < val) {
        fatDec(val - carb_per_val, true);
    } else {
        fatInc(carb_per_val - val);
    }

    carb_per_val = parseInt(val);
}

function fatInp(val) {
    document.getElementById('fat_out').innerHTML = 'Fat ' + val + '%';
    if (fat_per_val < val) {
        carbDec(val - fat_per_val, false, true);
    } else {
        carbInc(fat_per_val - val);
    }

    fat_per_val = parseInt(val);
}

$("#cal_perc_inc").click(function () {
    let perc = parseInt($("#cal_perc").val());
    $("#cal_perc").val(perc + 1);
    $("#cal_perc").change();
});

$("#cal_perc_dec").click(function () {
    let perc = parseInt($("#cal_perc").val());
    $("#cal_perc").val(perc - 1);
    $("#cal_perc").change();
});

function carbInc(val = 1) {
    let carb = parseInt($("#carb").val());
    if ((carb + val) <= 100) {
        $("#carb").val(carb + val);
        $("#carb_out").html("Carbs " + parseInt(carb + val) + "%");
        carb_per_val = parseInt($("#carb").val());
    }
}

function carbDec(val = 1, fat = false, pro = false) {
    let carb = parseInt($("#carb").val());
    let num = carb - 0;

    let dec = (num >= val) ? val : num;

    $("#carb").val(carb - dec);
    $("#carb_out").html("Carbs " + parseInt(carb - dec) + "%");
    carb_per_val = parseInt($("#carb").val());

    if (dec == val) return;

    val = val - num;

    if (fat == true) {
        fatDec(val, true);
    } else if (pro == true) {
        proDec(val);
    }
}

function fatInc(val = 1) {
    let fat = parseInt($("#fat").val());
    if ((fat + val) <= 100) {
        $("#fat").val(fat + val);
        $("#fat_out").html("Fat " + parseInt(fat + val) + "%");
        fat_per_val = parseInt($("#fat").val());
    }
}

function fatDec(val = 1, pro = false) {
    let fat = parseInt($("#fat").val());
    let num = fat - 0;

    let dec = (num >= val) ? val : num;

    $("#fat").val(fat - dec);
    $("#fat_out").html("Fat " + parseInt(fat - dec) + "%");
    fat_per_val = parseInt($("#fat").val());

    if (dec == val) return;

    val = val - num;

    if (pro == true) {
        proDec(val);
    }
}

function proInc(val = 1) {
    let pro = parseInt($("#pro").val());
    if ((pro + val) <= 100) {
        $("#pro").val(pro + val);
        $("#pro_out").html("Protein " + parseInt(pro + val) + "%");
        pro_per_val = parseInt($("#pro").val());
    }
}

function proDec(val = 1) {
    let pro = parseInt($("#pro").val());
    if ((pro - val) >= 0) {
        $("#pro").val(pro - val);
        $("#pro_out").html("Protein " + parseInt(pro - val) + "%");
        pro_per_val = parseInt($("#pro").val());
    }
}

$("#pro-inc").click(function () {
    proInc();
    carbDec(1, true);
});

$("#pro-dec").click(function () {
    proDec();
    carbInc();
});

$("#carb-inc").click(function () {
    carbInc();
    fatDec(1, true);
});

$("#carb-dec").click(function () {
    carbDec();
    fatInc();
});

$("#fat-inc").click(function () {
    fatInc();
    carbDec(1, false, true);
});

$("#fat-dec").click(function () {
    fatDec();
    carbInc();
});

$("#form").submit(function (e) {
    e.preventDefault();

    weight = parseFloat($("#weight").val());
    gender = $("#gender").val();
    age = parseInt($("#age").val());
    unit = $("#unit").val();
    activity_factor = parseFloat($("#activity").val());
    goal = $("#goal").val();
    height = parseFloat($("#height").val());
    percentage = parseInt($("#cal_perc").val());
    protein_per = parseFloat($("#pro").val());
    carbs_per = parseFloat($("#carb").val());
    fat_per = parseFloat($("#fat").val());
    daily_workout_time = parseInt($("#daily_workout_time").val());

    let total =
        parseFloat($("#pro").val()) +
        parseFloat($("#carb").val()) +
        parseFloat($("#fat").val());

    if (total != 100) {
        $("#error").text("* Total of Protien, carbs and fat must be 100%");
        return;
    } else {
        $("#error").text("");
    }

    if (unit == "imperial") {
        (function () {
            weight = weight / 2.205;
        })();

        (function () {
            ft = height;
            inch = parseFloat($("#inch").val());
            if (isNaN(inch)) inch = 0;
            height = ft * 30.48 + inch * 2.54;
        })();
    }

    (function () {
        BMR = 10 * weight + 6.25 * height - 5 * age;
    })();

    if (gender == "male") {
        BMR = BMR + 5;
    } else {
        BMR = BMR - 161;
    }

    (function () {
        daily_workout_time /= 30;
        water_intake = parseInt(
            (weight * 2.205 * 0.67 + daily_workout_time * 12) / 33.814
        );
    })();

    $("#water_intake").text(water_intake + " liter / day");

    AMR = parseInt(BMR * activity_factor);
    $("#maintain_cal").text(AMR + " kcal / day");

    calories = parseInt(AMR * (1 + percentage / 100));
    $("#calories").text(calories);

    protein = parseInt((calories * (protein_per / 100)) / 4);
    $("#total_pro").text(protein);

    carbs = parseInt((calories * (carbs_per / 100)) / 4);
    $("#total_carbs").text(carbs);

    fat = parseInt((calories * (fat_per / 100)) / 9);
    $("#total_fat").text(fat);

    if ($("input[name='day_meal']:checked").val() == "meal") {
        convert_day_to_meal();
    }

    $(".progress").attr("class", "progress");

    $(".progress-bar").animate(
        {
            width: "+=100%",
        },
        100
    );

    $(document).scrollTop($(document).height());
});

$("#meal").click(function () {
    $("#div_meal_num").attr("class", "");
    convert_day_to_meal();
});

function convert_day_to_meal() {
    meal_num = parseInt($("#meal_num").val());
    if (!isNaN(protein)) {
        $("#calories").text(
            calories % meal_num != 0
                ? parseFloat(calories / meal_num).toFixed(2)
                : calories / meal_num
        );
        $("#total_pro").text(
            protein % meal_num != 0
                ? parseFloat(protein / meal_num).toFixed(2)
                : protein / meal_num
        );
        $("#total_carbs").text(
            carbs % meal_num != 0
                ? parseFloat(carbs / meal_num).toFixed(2)
                : carbs / meal_num
        );
        $("#total_fat").text(
            fat % meal_num != 0
                ? parseFloat(fat / meal_num).toFixed(2)
                : fat / meal_num
        );
    }
    $("#kcal").text("kcal / meal");
    $(".gram").text("gram / meal");
}

$("#meal_num").change(function () {
    convert_day_to_meal();
});

$("#day").click(function () {
    $("#div_meal_num").attr("class", "d-none");
    if (!isNaN(protein)) {
        $("#calories").text(calories);
        $("#total_pro").text(protein);
        $("#total_carbs").text(carbs);
        $("#total_fat").text(fat);
    }
    $("#kcal").text("kcal / day");
    $(".gram").text("gram / day");
});