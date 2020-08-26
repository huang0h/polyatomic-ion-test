function start() {
    qs = document.getElementById('asknum').value;
    if (parseInt(qs) != Number(qs) ) {
        alert('You must enter a number');
        return;
    }
    if (Number(qs) > 0) {
        document.getElementById('main-body').style.display = 'none';
        document.getElementById('test-body').style.display = 'block';
        shuffleQs(qs)
        document.getElementById('name').innerHTML = compounds[idxs[0]];
        document.getElementById('qcount').innerHTML += counter + ' out of ' + qs;
        return;
    }
    alert("You must enter a number greater than 0");
}


function submit() {
    var form = document.getElementById('formulaanswer').value;
    var charg = document.getElementById('chargeanswer').value;
    var formstate = (form == formulas[idxs[0]])
    var chargestate = (charg == charges[idxs[0]])
    document.getElementById('submit').style.display = 'none';
    var feedback = document.getElementById('feedback');
    var respo = document.getElementById('response');
    feedback.style.display = 'block';
    //correct
    if (formstate && chargestate) {
        feedback.style.color = '#00DD00';
        respo.innerHTML = 'Correct!';
        correct++;
    }
    //answer incorrect
    else {
        feedback.style.color = 'red';
        respo.innerHTML = 'Incorrect: <br />';
        //charge incorect
        if (formstate) {
            correct += 0.5;
            var repstring = 'The charge of ' + compounds[idxs[0]] + ' is ' + charges[idxs[0]];
            respo.innerHTML += repstring;
        }
        //formula incorrect
        else if (chargestate) {
            correct += 0.5;
            var repstring = 'The formula of ' + compounds[idxs[0]] + ' is ' + formulas[idxs[0]];
            respo.innerHTML += repstring;
        }
        //all incorrect
        else {
            var repstring = 'The charge of ' + compounds[idxs[0]] + ' is ' + charges[idxs[0]];
            repstring += '<br />The formula of ' + compounds[idxs[0]] + ' is ' + formulas[idxs[0]];    
            respo.innerHTML += repstring;
        }
    } 
}

function nextQ() {
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('submit').style.marginTop = '15%';
    if (counter >= qs) {
        loadEnd();
        return;
    }
    counter++;
    loadNextQ();
}

function loadNextQ() {
    idxs.splice(0, 1);
    document.getElementById('name').innerHTML = compounds[idxs[0]];
    document.getElementById('formulaanswer').value = '';
    document.getElementById('chargeanswer').value = '';
    document.getElementById('qcount').innerHTML = 'Question ' + counter + ' out of ' + qs;
    document.getElementById('formulaanswer').focus();
}

function loadEnd() {
    document.getElementById('test-body').style.display = 'none';
    document.getElementById('end-body').style.display = 'block';
    //fill in report text
    var scorestring = (correct / counter) * 100 + '%';
    document.getElementById('score').innerHTML += scorestring;
    var corrstring = correct + '/' + counter;
    var incostring = (counter - correct) + '/' + counter;
    document.getElementById('corrrepo').innerHTML = 'Correct: ' + corrstring;
    document.getElementById('incorepo').innerHTML = 'Incorrect: ' + incostring;
}

function shuffleQs(num) {
    for (j = 0; j < Math.ceil(num / compounds.length); j++) {
        shuffind = [];
        for (var i = 0; i <= compounds.length; i++) {
            shuffind.push(i);
        }
        for (i = 0; i <= compounds.length; i++) {
            rand = Math.floor((Math.random() * shuffind.length));
            idxs.push(shuffind[rand]);
            shuffind.splice(rand, 1);
        }
    }
}


//56 compounds
compounds = [
    'Ammonium', 'Cesium', 'Copper (I)',
    'Potassium', 'Silver', 'Sodium',
    'Barium', 'Beryllium', 'Cadmium',
    'Cobalt (II)', 'Copper (II)', 'Iron (II)',
    'Lead (II)', 'Magnesium', 'Mercury (I)',
    'Mercury (II)', 'Nickel', 'Strontium', 
    'Zinc', 'Aluminum', 'Chromium (III)', 
    'Iron (III)', 'Acetate', 'Bromide', 
    'Chlorate', 'Chlorite', 'Chloride',
    'Cyanide', 'Fluoride', 'Bicarbonate',
    'Hydrogen Sulfate', 'Hydrogen Sulfide',
    'Hydroxide', 'Iodide', 'Nitrate',
    'Nitrite', 'Thiocyanate', 'Perchlorate',
    'Permanganate', 'Carbonate', 'Chromate',
    'Dichromate', 'Oxide', 'Oxalate',
    'Peroxide', 'Sulfate', 'Sulfide',
    'Sulfite', 'Tartrate', 'Phosphate',
    'Phosphite', 'Nitride', 'Lead (IV)',
    'Tin (II)', 'Tin (IV)', 'Hypochlorite'
];

formulas = [
    'NH4', 'Cs', 'Cu',
    'K', 'Ag', 'Na',
    'Ba', 'Be', 'Cd',
    'Co', 'Cu', 'Fe', 
    'Pb', 'Mg', 'Hg2',
    'Hg', 'Ni', 'Sr',
    'Zn', 'Al', 'Cr',
    'Fe', 'C2H3O2', 'Br',
    'ClO3', 'ClO2', 'Cl',
    'CN', 'F', 'HCO3',
    'HSO4', 'HS', 
    'OH', 'I', 'NO3', 
    'NO2', 'SCN', 'ClO4',
    'MnO4', 'CO3', 'CrO4',
    'Cr2O7', 'O', 'C2O4',
    'O2', 'SO4', 'S',
    'SO3', 'C4H4O6', 'PO4',
    'PO3', 'N', 'Pb',
    'Sn', 'Sn', 'ClO'
];

charges = [
    '1+', '1+', '1+', 
    '1+', '1+', '1+', 
    '2+', '2+', '2+', 
    '2+', '2+', '2+', 
    '2+', '2+', '2+', 
    '2+', '2+', '2+', 
    '2+', '3+', '3+', 
    '3+', '1-', '1-', 
    '1-', '1-', '1-', 
    '1-', '1-', '1-', 
    '1-', '1-', 
    '1-', '1-', '1-', 
    '1-', '1-', '1-', 
    '1-', '2-', '2-', 
    '2-', '2-', '2-', 
    '2-', '2-', '2-', 
    '2-', '2-', '3-', 
    '3-', '3-', '4+',
    '2+', '4+', '1-'   
];


idxs = [];

qs = 0;
counter = 1;
correct = 0;
