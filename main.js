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
    idxs.splice(0, 1)
    document.getElementById('name').innerHTML = compounds[idxs[0]];
    document.getElementById('formulaanswer').value = '';
    document.getElementById('chargeanswer').value = '';
    document.getElementById('qcount').innerHTML = 'Question ' + counter + ' out of ' + qs;
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
        var shuffind = ind
        for (i = 0; i < 59; i++) {
            rand = Math.floor((Math.random() * shuffind.length))
            idxs.push(shuffind[rand])
            shuffind.splice(rand, 1)
        }
    }
}


//59 compounds
compounds = [
    'Hydrogen', 'Lithium', 'Sodium',
    'Potassium', 'Cesium', 'Beryllium',
    'Magnesium', 'Calcium', 'Barium',
    'Aluminum', 'Silver', 'Hydride',
    'Fluoride', 'Chloride', 'Bromide',
    'Iodide', 'Oxide', 'Sulfide',
    'Nitride', 'Phosphide', 'Iron (III)',
    'Iron (II)', 'Copper (II)', 'Copper (I)',
    'Cobalt (III)', 'Cobalt (II)', 'Tin (IV)',
    'Tin (II)', 'Lead (IV)', 'Lead(II)', 
    'Mercury (II)', 'Mercury (I)', 'Silver',
    'Zinc', 'Cadmium', 'Ammonium',
    'Nitrite', 'Nitrate', 'Sulfite',
    'Sulfate', 'Hydrogen sulfate (bisulfate)', 'Hydroxide',
    'Cyanide', 'Phosphate', 'Hydrogen phosphate',
    'Dihydrogen phosphate', 'Thiocyante', 'Carbonate',
    'Hydrogen carbonate (bicarbonate)', 'Hypochlorite',
    'Chlorite', 'Chlorate', 'Perchlorate',
    'Acetate', 'Permanganate', 'Dichromate',
    'Chromate', 'Peroxide', 'Oxalate'

]

formulas = [
    'H', 'Li', 'Na',
    'K', 'Cs', 'Be',
    'Mg', 'Ca', 'Ba',
    'Al', 'Ag', 'H',
    'F', 'Cl', 'Br',
    'I', 'O', 'S',
    'N', 'P', 'Fe',
    'Fe', 'Cu', 'Cu',
    'Co', 'Co', 'Sn',
    'Sn', 'Pb', 'Pb',
    'Hg', 'Hg2', 'Ag',
    'Zn', 'Cd', 'NH4',
    'NO2', 'NO3', 'SO3',
    'SO4', 'HSO4', 'OH',
    'CN', 'PO4', 'HPO4',
    'H2PO4', 'NCS', 'CO3',
    'HCO3', 'ClO', 
    'ClO2', 'ClO3', 'ClO4',
    'C2H3O2', 'MnO4', 'Cr2O7',
    'CrO4', 'O2', 'C2O4'
]

charges = [
    '1+', '1+', '1+',
    '1+', '1+', '2+',
    '2+', '2+', '2+', 
    '3+', '1+', '1-', 
    '1-', '1-', '1-', 
    '1-', '2-', '2-',
    '3-', '3-', '3+',
    '2+', '2+', '1+',
    '3+', '2+', '4+',
    '2+', '4+', '2+',
    '2+', '2+', '1+',
    '2+', '2+', '1+',
    '1-', '1-', '2-',
    '2-', '1-', '1-', 
    '1-', '3-', '2-',
    '1-', '1-', '2-',
    '1-', '1-', 
    '1-', '1-', '1-', 
    '1-', '1-', '2-',
    '2-', '2-', '2-'
]

ind = []
for (var i = 0; i < compounds.length; i++) {
    ind.push(i)
}

idxs = []

qs = 0
counter = 1
correct = 0