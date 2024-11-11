import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import preduzece from './model/korisnik';
import racun from './model/racun';
import sifarnik from './model/sifarnik';
import narudzbina from './model/narudzbina';
import artikal from './model/artikal';
import kategorija from './model/kategorija';
import { Admin, ServerApiVersion } from 'mongodb';
import { fstat, writeFile } from 'fs';
import e from 'express';
import odeljenje from './model/odeljenje';
import admin from './model/admin';
import kupac from './model/kupac';
import izvestaj from './model/izvestaj';

const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/ProjekatDB");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija');
});

const router = express.Router();

router.route('/AdminPrijavaNaSistem').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    admin.findOne({"kor_ime":kor_ime, "lozinka": lozinka}, (err, a)=>{
        if(err) console.log(err);
        else res.json(a);
    })
});


router.route('/prijavaNaSistem').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    preduzece.findOne({"kor_ime":kor_ime, "lozinka": lozinka, "status": "aktivan"}, (err, korisnik)=>{
        if(err) console.log(err);
        else res.json(korisnik);
    })
});

router.route('/prijavaNaSistemKupca').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    kupac.findOne({"kor_ime":kor_ime, "lozinka": lozinka, "status": "aktivan"}, (err, korisnik)=>{
        if(err) console.log(err);
        else res.json(korisnik);
    })
});

router.route('/promenaLozinke').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let novaLozinka = req.body.nova;


    preduzece.findOne({ "kor_ime": kor_ime, "lozinka": lozinka}, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        else {
            preduzece.collection.updateOne({"kor_ime":kor_ime, "lozinka": lozinka}, {$set: {"lozinka": novaLozinka}});
            res.json(korisnik);
        }
    })
});

router.route('/artikli/pretraga').get((req, res)=>{
let searchParam = req.query.param;

        artikal.find({"naziv_artikla": {$regex: searchParam}},(err, art)=>{
            
            if(err) console.log(err)
            else res.json(art)
        })
    }
)

router.route('/AdminPromenaLozinke').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let novaLozinka = req.body.nova;


    admin.findOne({ "kor_ime": kor_ime, "lozinka": lozinka}, (err, a) => {
        if (err) {
            console.log(err);
        }
        else {
            preduzece.collection.updateOne({"kor_ime":kor_ime, "lozinka": lozinka}, {$set: {"lozinka": novaLozinka}});
            res.json(a);
        }
    })
});

router.route('/dopuna').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let tip = req.body.tip;
    let magacini = req.body.magacini;
    let uSistemu = req.body.uSistemu;
    let ziroRacuni = req.body.ziroRacuni;
    let kase = req.body.kase;
    let delatnosti = req.body.delatnosti;


    preduzece.findOne({ "kor_ime": kor_ime}, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        else {
            preduzece.collection.updateOne({"kor_ime":kor_ime}, {$set: {"tip": tip,"postavljen":true,"magacini":magacini,"uSistemu":uSistemu,
            "ziroRacuni":ziroRacuni,"kase":kase,"delatnosti":delatnosti}});
            res.json(korisnik);
        }
    })
});
router.route('/zahtevi').post((req, res)=>{

    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let  prezime = req.body.prezime;
    let  broj = req.body.broj;
    let  mejl = req.body.mejl;
    let  naziv = req.body.naziv;
    let  tip = req.body.tip;
    let  adresa = req.body.adresa;
    let  matBroj = req.body.matBroj;
    let pib= req.body.pib;
    let grb = req.body.grb;


    preduzece.findOne({ "kor_ime": kor_ime}, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        if (korisnik){
            res.json({"message":"usernameError"})
        }
        else {
            preduzece.findOne({ "mejl": mejl}, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                if (korisnik){
                    res.json({"message":"emailError"})
                }
                else {kupac.findOne({ "kor_ime": kor_ime }, (err, korisnik) => {
                    if (err) {
                        console.log(err);
                    }
                    if (korisnik) {
                        res.json({ "message": "usernameError" })
                    }
                    else {


                    preduzece.findOne({ "pib": pib}, (err, korisnik) => {
                        if (err) {
                            console.log(err);
                        }
                        if (korisnik){
                            res.json({"message":"pibError"})
                        }
                        else {
            preduzece.collection.insertOne({"kor_ime":kor_ime, "lozinka": lozinka, "ime": ime, "prezime":prezime, "tel":broj, "mejl":mejl, "naziv":naziv,"tip":tip
        ,"sediste":adresa,"mat_broj":matBroj, "pib":pib, "status":"neaktivan", "postavljen":false,"grb":grb })
        console.log(grb)
            res.json({"message":"done"})
            

        }
    }) }})}
    });}
})
})

router.route('/izmena').post((req, res)=>{
    let staro_kor_ime = req.body.staro_kor_ime
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let  prezime = req.body.prezime;
    let  broj = req.body.broj;
    let  mejl = req.body.mejl;
    let  naziv = req.body.naziv;
    let  tip = req.body.tip;
    let  adresa = req.body.adresa;
    let  matBroj = req.body.matBroj;
    let pib= req.body.pib;


    preduzece.findOne({ "kor_ime": kor_ime}, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        if (korisnik){
            if(staro_kor_ime !== kor_ime)
            res.json({"message":"usernameError"})
        }
        else {
            preduzece.findOne({ "mejl": mejl}, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                if (korisnik){
                    res.json({"message":"emailError"})
                }
                else {
            preduzece.collection.updateOne({"kor_ime":staro_kor_ime},{$set: {"kor_ime":kor_ime,"lozinka": lozinka, "ime": ime, "prezime":prezime, "tel":broj, "mejl":mejl, "naziv":naziv,"tip":tip
        ,"sediste":adresa,"mat_broj":matBroj, "pib":pib, "status":"neaktivan", "postavljen":false }})
            res.json({"message":"done"});
        }
    });}
})
})

router.route('/zahtevi').post((req, res)=>{

    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let  prezime = req.body.prezime;
    let  broj = req.body.broj;
    let  mejl = req.body.mejl;
    let  naziv = req.body.naziv;
    let  tip = req.body.tip;
    let  adresa = req.body.adresa;
    let  matBroj = req.body.matBroj;
    let pib= req.body.pib;
    let grb = req.body.grb;


    preduzece.findOne({ "kor_ime": kor_ime}, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        if (korisnik){
            res.json({"message":"usernameError"})
        }
        else {
            preduzece.findOne({ "mejl": mejl}, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                if (korisnik){
                    res.json({"message":"emailError"})
                }
                else {
                    preduzece.findOne({ "pib": pib}, (err, korisnik) => {
                        if (err) {
                            console.log(err);
                        }
                        if (korisnik){
                            res.json({"message":"pibError"})
                        }
                        else {
            preduzece.collection.insertOne({"kor_ime":kor_ime, "lozinka": lozinka, "ime": ime, "prezime":prezime, "tel":broj, "mejl":mejl, "naziv":naziv,"tip":tip
        ,"sediste":adresa,"mat_broj":matBroj, "pib":pib, "status":"neaktivan", "postavljen":false,"grb":grb })
        console.log(grb)
            res.json({"message":"done"})
            

        }
    }) }
    });}
})
})



router.route('/adminRegistracija').post((req, res) => {

    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let broj = req.body.broj;
    let mejl = req.body.mejl;
    let naziv = req.body.naziv;
    let tip = req.body.tip;
    let adresa = req.body.adresa;
    let matBroj = req.body.matBroj;
    let pib = req.body.pib;
    let grb = req.body.grb;


    preduzece.findOne({ "kor_ime": kor_ime }, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        if (korisnik) {
            res.json({ "message": "usernameError" })
        }
        else {
            kupac.findOne({ "kor_ime": kor_ime }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                if (korisnik) {
                    res.json({ "message": "usernameError" })
                }
                else {
                    preduzece.findOne({ "mejl": mejl }, (err, korisnik) => {
                        if (err) {
                            console.log(err);
                        }
                        if (korisnik) {
                            res.json({ "message": "emailError" })
                        }
                        else {
                            preduzece.findOne({ "pib": pib }, (err, korisnik) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (korisnik) {
                                    res.json({ "message": "pibError" })
                                }
                                else {
                                    preduzece.collection.insertOne({
                                        "kor_ime": kor_ime, "lozinka": lozinka, "ime": ime, "prezime": prezime, "tel": broj, "mejl": mejl, "naziv": naziv, "tip": tip
                                        , "sediste": adresa, "mat_broj": matBroj, "pib": pib, "status": "neaktivan", "postavljen": false, "grb": grb
                                    })
                                    console.log(grb)
                                    res.json({ "message": "done" })


                                }
                            })
                        }
                    });
                }
            })
}
    })
})

router.route('/adminRegistracijaKupca').post((req, res)=>{

    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let  prezime = req.body.prezime;
    let  broj = req.body.broj;
    let  brLk = req.body.lk;


    kupac.findOne({ "kor_ime": kor_ime}, (err, korisnik) => {
        if (err) {
            console.log(err);
        }
        if (korisnik){
            res.json({"message":"usernameError"})
        }
        else {
            preduzece.findOne({ "kor_ime": kor_ime}, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                if (korisnik){
                    res.json({"message":"usernameError"})
                }
                else{
            kupac.findOne({ "brLk": brLk}, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                if (korisnik){
                    res.json({"message":"lkError"})
                }
                else {
            kupac.collection.insertOne({"kor_ime":kor_ime, "lozinka": lozinka, "ime": ime, "prezime":prezime, "tel":broj, "brLk":brLk })
            res.json({"message":"done"})
            

        }
    }) }
    });}
}
)
})






router.route('/dohvatiSifarnik').get((req, res)=>{
    sifarnik.find({}, (err, delatnosti)=>{
        if(err) console.log(err);
        else res.json(delatnosti);
    });
});

router.route('/dohvatiPreduzeca').post((req, res)=>{
    preduzece.find({}, (err, korisnici)=>{
        if(err) console.log(err);
        else res.json(korisnici);
    });
});

router.route('/aktivirajPreduzece').post((req, res)=>{
    let id = req.body.id;
    preduzece.collection.updateOne({"pib":id},{$set: {"status":"aktivan"}}, (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });
});

router.route('/deaktivirajPreduzece').post((req, res)=>{
    let id = req.body.id;
    preduzece.collection.updateOne({"pib":id},{$set: {"status":"neaktivan"}}, (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });
});


router.route('/dohvatiRacune').get((req, res)=>{
    racun.find({}, (err, racuni)=>{
        if(err) console.log(err);
        else res.json(racuni);
    }).sort({"datum":-1}).limit(5);
});

router.route('/dohvatiArtikle').post((req, res)=>{
    let pib=req.body.pib;
    artikal.find({"pib": pib}, (err, artikli)=>{
        if(err) console.log(err);
        else res.json(artikli);
    });
});

router.route('/ukloniArtikal').post((req, res)=>{
    let sifra = req.body.sifra;

    artikal.remove({"sifra_artikla":sifra}, (err)=>{
        if(err) console.log(err);
    })
});

router.route('/izmeniArtikal').post((req, res)=>{
    let sifra = req.body.sifra;
    let sifra_artikla= req.body.sifra_artikla;
    let naziv_artikla= req.body.naziv_artikla;
    let jedinica_mere= req.body.jedinica_mere;
    let stopa_poreza= req.body.stopa_poreza;
    let proizvodjac=req.body.proizvodjac;
    let tip= req.body.tip;
    let zemlja_porekla=req.body.zemlja_porekla;
    let strani_naziv_artikla= req.body.strani_naziv_artikla;
    let barkod=req.body.barkod;
    let carinska_tarifa= req.body.carinska_tarifa;
    let eko_taksa= req.body.eko_taksa;
    let akcize= req.body.akcize;
    let min_zeljene_zalihe=req.body.min_zeljene_zalihe;
    let maks_zeljene_zalihe= req.body.maks_zeljene_zalihe;
    let opis= req.body.opis;
    let deklaracija= req.body.deklaracija;
    let magacini_i_objekti= req.body.magacini_i_objekti;
    let pib=req.body.pib;


    artikal.collection.updateOne({"sifra_artikla":sifra}, {$set: {'sifra_artikla':sifra_artikla,'naziv_artikla':naziv_artikla,'jedinica_mere':jedinica_mere,
    'stopa_poreza':stopa_poreza,'proizvodjac':proizvodjac,'tip':tip,'zemlja_porekla':zemlja_porekla,'strani_naziv_artikla':strani_naziv_artikla,
    'barkod':barkod,'carinska_tarifa':carinska_tarifa,'eko_taksa':eko_taksa,'akcize':akcize,'min_zeljene_zalihe':min_zeljene_zalihe,
    'maks_zeljene_zalihe':maks_zeljene_zalihe,'opis':opis,'deklaracija':deklaracija, 'magacini_i_objekti':magacini_i_objekti,"pib":pib}});
    res.json({poruka:1})
   
    })

router.route('/unesiArtikal').post((req, res)=>{
    let sifra_artikla= req.body.sifra_artikla;
    let naziv_artikla= req.body.naziv_artikla;
    let jedinica_mere= req.body.jedinica_mere;
    let stopa_poreza= req.body.stopa_poreza;
    let proizvodjac=req.body.proizvodjac;
    let tip= req.body.tip;
    let zemlja_porekla=req.body.zemlja_porekla;
    let strani_naziv_artikla= req.body.strani_naziv_artikla;
    let barkod=req.body.barkod;
    let carinska_tarifa= req.body.carinska_tarifa;
    let eko_taksa= req.body.eko_taksa;
    let akcize= req.body.akcize;
    let min_zeljene_zalihe=req.body.min_zeljene_zalihe;
    let maks_zeljene_zalihe= req.body.maks_zeljene_zalihe;
    let opis= req.body.opis;
    let deklaracija= req.body.deklaracija;
    let magacini_i_objekti= req.body.magacini_i_objekti;
    let pib=req.body.pib;

    artikal.collection.insertOne({'sifra_artikla':sifra_artikla,'naziv_artikla':naziv_artikla,'jedinica_mere':jedinica_mere,
'stopa_poreza':stopa_poreza,'proizvodjac':proizvodjac,'tip':tip,'zemlja_porekla':zemlja_porekla,'strani_naziv_artikla':strani_naziv_artikla,
'barkod':barkod,'carinska_tarifa':carinska_tarifa,'eko_taksa':eko_taksa,'akcize':akcize,'min_zeljene_zalihe':min_zeljene_zalihe,
'maks_zeljene_zalihe':maks_zeljene_zalihe,'opis':opis,'deklaracija':deklaracija, 'magacini_i_objekti':magacini_i_objekti,"pib":pib});
    res.json({poruka:1})
        
    })



router.route('/pretraziPreduzeca').get((req,res)=>{
    let searchParam = req.query.param;

    preduzece.find({"pib": {$regex: searchParam}},(err, korisnik)=>{
        if(err) console.log(err)
        else res.json(korisnik)
    })
});


router.route('/dodajNarudzbinu').post((req,res)=>{
    let naziv = req.body.naziv;
    let pib = req.body.pib;
    let narucilac = req.body.narucilac;
    let narucilacPIB= req.body.narucilacPIB;
    let brDana= req.body.brDana;
    let procenatRabata =  req.body.procenatRabata;
    let datum=Date.now();

    narudzbina.collection.insertOne({"naziv":naziv,"pib":pib,"narucilac":narucilac,"narucilacPIB":narucilacPIB,"brDana":brDana,"procenatRabata":procenatRabata,
"DatumNarudzbine":datum})
});

router.route('/dohvatiKategorizaciju').post((req,res)=>{
    let id = req.body.id;

    kategorija.find({"id":id},(err, kategorije)=>{
        if(err) console.log(err)
        else res.json(kategorije)
    })
});

router.route('/sacuvajKategorizaciju').post((req,res)=>{
    let kategorije= req.body.kategorije;


    kategorija.collection.insertMany( kategorije,(err, respObj)=>{
        if(err) console.log(err)
        else res.json({poruka:1});
    })
});

router.route('/dohvatiNarucioce').post((req,res)=>{
  

    odeljenje.distinct("narucilacPIB",(err, od)=>{
        if(err) console.log(err)
        else res.json(od)
    })
});

router.route('/dohvatiRacuneKupca').post((req,res)=>{
  let id =req.body.id

        racun.find({"brLk":id},(err, r)=>{
        if(err) console.log(err)
        else res.json(r)
    })
});




router.route('/sacuvajRaspored').post((req,res)=>{
    let id =req.body.id;
    let naziv=req.body.naziv;
    let stolovi=req.body.stolovi;
    let pib=req.body.pib;
    let nazivO=req.body.nazivO;    


    odeljenje.findOne({"id":id,"nazivObjekta":nazivO,"pib":pib},(err,od)=>{
        if(err) console.log(err)
        if(od){
            odeljenje.collection.updateOne({"id":id,"nazivObjekta":nazivO,"pib":pib}, {$set: {"stolovi": stolovi}});
        }
        else{
            odeljenje.collection.insertOne({"id":id,"naziv":naziv, "stolovi": stolovi,"pib":pib,"nazivObjekta":nazivO})
        }
    })
});

router.route('/dohvatiRaspored').post((req,res)=>{
    let id =req.body.id;
    let naziv=req.body.naziv;
    


    odeljenje.find({"nazivObjekta":naziv,"pib":id},(err,od)=>{
        if(err) console.log(err)
        else
           res.json(od);
    })
});

router.route('/dohvatiDanasnjeRacune').post((req,res)=>{
    let d=req.body.d;
    let m=req.body.m;
    let y=req.body.d;

    var start= new Date(y,m,d-1);
    var end= new Date(y,m,d+1);
    


    racun.find({"datum":{$gt:start,$lt:end}},(err,od)=>{
        if(err) console.log(err)
        else
           res.json(od);
    })
});


router.route('/unesiRacun').post((req,res)=>{
    let ime=req.body.ime;
    let prezime=req.body.prezime;
    let brLk=req.body.brLk;
    let stavke=req.body.stavke;
    let pib = req.body.pib;
    let ukupanIznos=req.body.ukupanIznos;
    let ukupanPorez=req.body.ukupanPorez;
    let placanje=req.body.placanje;
    let nazivO=req.body.nazivO;
    let nazivP=req.body.nazivP;
    let narucilac= req.body.narucilac;
    let datum= Date.now();
    let dat=new Date('<YYYY-mm-dd>');
    ;

    racun.collection.insertOne({"ime":ime,"prezime":prezime,"brLk":brLk,"stavke":stavke,"pib":pib,"iznos":ukupanIznos,
    "pdv":ukupanPorez,"nacinPlacanja":placanje,"nazivPreduzeca":nazivP,"nazivObjekta":nazivO,
    "narucilac":narucilac,
"datum":datum},(err=>{
        if(err) console.log(err);
        else {res.json(1);
    izvestaj.find({"pib":pib,"datum":dat},(err,i)=>{
        if(err) console.log(err)
        else if (i) izvestaj.collection.updateOne({"pib":pib,"datum":dat},{$inc:{"iznos":ukupanIznos,"porez":ukupanPorez}})
        else izvestaj.collection.insertOne({"pib":pib,"naziv":nazivP,"datum":dat,"iznos":ukupanIznos,"porez":ukupanPorez})
    })
        
        
        
        }
    }))
   


   

}) 

router.route('/dohvatiIzvestaj').post((req,res)=>{
    let dp=req.body.dp;
    let mp=req.body.mp;
    let yp=req.body.dp;
    let dk=req.body.dk;
    let mk=req.body.mk;
    let yk=req.body.dk;

    var start= new Date(yp,mp,dp-1);
    var end= new Date(yk,mk,dk+1);
    


    izvestaj.find({"datum":{$gt:start,$lt:end}},(err,od)=>{
        if(err) console.log(err)
        else
           res.json(od);
    })
});



/*
router.route('/kupiProizvod').post((req, res)=>{
    let nazivProizvoda = req.body.nazivProizvoda;
    let kor_ime = req.body.kor_ime;

    proizvod.collection.updateOne({"naziv":nazivProizvoda}, {$inc: {"kolicina": -1}});
    korisnik.findOne({"kor_ime":kor_ime, "proizvodi.naziv": nazivProizvoda}, (err, korisnikJeVecKupovaoProizvod)=>{
        if(err) console.log(err);
        else{
            if(korisnikJeVecKupovaoProizvod){
                korisnik.collection.updateOne({"kor_ime":kor_ime, "proizvodi.naziv": nazivProizvoda}, {$inc: {"proizvodi.$.kolicina": 1}});
                //proizvodi.$.kolicina pristupam prvom objektu u kupljenim proizvodima koji ispunjava uslov
            }
            else{
                let kupljenProizvod={
                    naziv: nazivProizvoda,
                    kolicina: 1
                }
                korisnik.collection.updateOne({"kor_ime":kor_ime}, {$push: {"proizvodi": kupljenProizvod}});
            }
            res.json({poruka: 1});
        }
    })
});

router.route('/komentarisiProizvod').post((req, res)=>{
    let nazivProizvoda = req.body.nazivProizvoda;
    let komentar = req.body.komentar;

    let komentarObjekat = {
        komentar: komentar
    }

    proizvod.collection.updateOne({"naziv":nazivProizvoda}, {$push: {"komentari": komentarObjekat}});
    res.json({poruka: 1});
});

router.route('/dohvatiSveProizvode').get((req, res)=>{
    proizvod.find({}, (err, proizvodi)=>{
        if(err) console.log(err);
        else res.json(proizvodi);
    })
});

router.route('/dodajProizvod').post((req, res)=>{
    let nazivProizvoda = req.body.nazivProizvoda;

    proizvod.collection.updateOne({"naziv":nazivProizvoda}, {$inc: {"kolicina": 1}});
    res.json({poruka: 1});
});

router.route('/ukloniProizvod').post((req, res)=>{
    let nazivProizvoda = req.body.nazivProizvoda;

    proizvod.collection.updateOne({"naziv":nazivProizvoda}, {$inc: {"kolicina": -1}});
    res.json({poruka: 1});
});*/

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));