const fs = require('fs');
var convert = require('xml-js');
const json2xls = require("json2xls");
const util = require("util");
const { version } = require('os');


function listarArquivosEPastasDeUmDiretorio(diretorio, arquivos) {
    
    if(!arquivos)
        arquivos = [];

    let listaDeArquivos = fs.readdirSync(diretorio);
    for(let k in listaDeArquivos) {
        let stat = fs.statSync(diretorio + '/' + listaDeArquivos[k]);
        if(stat.isDirectory())
            listarArquivosEPastasDeUmDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }
    
    return arquivos;

}

let lista = listarArquivosEPastasDeUmDiretorio('./files');

var arrayNota = [];


 for (var i = 0; i < lista.length; i++){
    a = lista.slice(i,i)
    var listaString = lista[i].toString();

     var xml = require('fs').readFileSync(listaString, "utf-8");   
     var options = { compact: true, spaces: 4, ignoreComment: true, ignoreCdata: true };
     var result = convert.xml2js(xml, options);


        if ((result.nfeProc.NFe.infNFe.det._attributes) === undefined) {


            for( var idet = 0; idet < result.nfeProc.NFe.infNFe.det.length; idet++) {
        
                if (
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 != undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                )
    
                { 
                    var notas = {
    
                    Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                     DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                     tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                     CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                     NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                     CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                     NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                     CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                     EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                     DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                     NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                     CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                     cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                     CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                     Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                     ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                     ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                     CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00.CST._text,
                     BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00.vBC._text,
                     porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00.pICMS._text),
                     ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00.vICMS._text,
                     ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                     BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                     ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                     valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                     valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                     valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                     valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                     valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                     valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                     valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                     valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                     valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                     valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                     valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
               
                   }   
               
                   arrayNota.push(notas)
    
    
                } else
                if (
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 != undefined && 
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                    )
        
                    { 
                        var notas = {
    
                            Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                            DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                            tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                            CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                            NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                            CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                            NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                            CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                            EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                            DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                            NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                            CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                            cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                            CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                            Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                            ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                            ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                            CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10.CST._text,
                            BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10.vBC._text,
                            porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10.pICMS._text),
                            ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10.vICMS._text,
                            ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                            BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                            ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                            valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                            valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                            valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                            valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                            valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                            valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                            valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                            valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                            valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                      
                          }   
                      
                          
                          arrayNota.push(notas)
        
        
                    } else            
                    if (
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 != undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                        )
            
                        { 
                            var notas = {
    
                                Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20.CST._text,
                                BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20.vBC._text,
                                porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20.pICMS._text),
                                ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20.vICMS._text,
                                ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                          
                              }   
                          
                              arrayNota.push(notas)
            
            
                        } else    
                        if (
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 != undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                            )
                
                            { 
                                var notas = {
    
                                    Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                    DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                    tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                    CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                    NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                    CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                    NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                    CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                    EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                    DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                    NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                    CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                    cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                    CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                    Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                    ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                    ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                    CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30.CST._text,
                                    BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30.vBC._text,
                                    porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30.pICMS._text),
                                    ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30.vICMS._text,
                                    ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                    BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                    ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                    valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                    valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                    valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                    valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                    valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                    valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                    valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                    valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                    valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                              
                                  }   
                              
                                  arrayNota.push(notas)
                
                
                            } else
                            if (
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 != undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                                )
                    
                                { 
                                    var notas = {
    
                                        Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                        DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                        tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                        CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                        NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                        CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                        NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                        CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                        EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                        DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                        NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                        CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                        cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                        CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                        Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                        ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                        ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                        CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40.CST._text,
                                        BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 = 0,
                                        porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 = 0),
                                        ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS = 0,
                                        ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                        BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                        ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                        valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                        valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                        valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                        valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                        valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                        valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                        valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                        valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                        valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                
                                    }   
                                
                                    arrayNota.push(notas)
                    
                    
                                } else
                                if (
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 != undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                                    )
                        
                                    { 
                                        var notas = {
    
                                            Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                            DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                            tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                            CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                            NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                            CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                            NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                            CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                            EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                            DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                            NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                            CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                            cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                            CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                            Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                            ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                            ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                            CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50.CST._text,
                                            BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50.vBC._text,
                                            porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50.pICMS._text),
                                            ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50.vICMS._text,
                                            ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                            BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                            ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                            valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                            valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                            valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                            valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                            valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                            valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                            valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                            valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                            valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                      
                                          }   
                                      
                                          arrayNota.push(notas)
                        
                        
                                    } else
                                    if (
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 != undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                                        result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                                        )
                            
                                        { 
                                            var notas = {
    
                                                Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                                EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                                NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                                CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                                cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                                Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                                ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                                ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                                CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60.CST._text,
                                                BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60.vBC._text,
                                                porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60.pICMS._text),
                                                ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60.vICMS._text,
                                                ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                          
                                              }   
                                          
                                              arrayNota.push(notas)
                            
                            
                                        } else
                                        if (
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 != undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                                            result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                                            )
                                
                                            { 
                                                var notas = {
    
                                                    Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                    DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                    tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                    CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                    NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                    CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                    NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                    CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                                    EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                    DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                                    NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                                    CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                                    cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                    CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                                    Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                                    ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                                    ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                                    CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70.CST._text,
                                                    BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70.vBC._text,
                                                    porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70.pICMS._text),
                                                    ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70.vICMS._text,
                                                    ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                    BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                    ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                    valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                    valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                    valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                    valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                    valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                    valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                    valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                    valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                    valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                              
                                                  }   
                                              
            
                                                  arrayNota.push(notas)
                                
                                
                                            } else
                                            if (
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 != undefined &&
                                                result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 === undefined 
                                                )
                                    
                                                { 
                                                    var notas = {
    
                                                        Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                        DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                        tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                        CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                        NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                        CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                        NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                        CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                                        EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                        DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                                        NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                                        CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                                        cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                        CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                                        Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                                        ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                                        ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                                        CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80.CST._text,
                                                        BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80.vBC._text,
                                                        porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80.pICMS._text),
                                                        ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80.vICMS._text,
                                                        ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                        BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                        ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                        valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                        valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                        valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                        valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                        valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                        valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                        valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                        valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                        valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                                  
                                                      }   
                                                  
                                                      arrayNota.push(notas)
                                    
                                    
                                                } else
                                                if (
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS00 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS10 === undefined && 
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS20 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS30 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS40 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS50 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS60 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS70 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS80 === undefined &&
                                                    result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90 != undefined 
                                                    )
                                        
                                                    { 
                                                        var notas = {
    
                                                            Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                            DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                            tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                            CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                            NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                            CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                            NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                            CodigoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.cProd._text,
                                                            EAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                            DescriçaoProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.xProd._text,
                                                            NCM:  result.nfeProc.NFe.infNFe.det[idet].prod.NCM._text,
                                                            CEST:  result.nfeProc.NFe.infNFe.det[idet].prod.CEST,
                                                            cEAN:  result.nfeProc.NFe.infNFe.det[idet].prod.cEAN._text,
                                                            CFOP:  result.nfeProc.NFe.infNFe.det[idet].prod.CFOP._text,
                                                            Quantidade:  result.nfeProc.NFe.infNFe.det[idet].prod.qCom._text,
                                                            ValorUnitario:  result.nfeProc.NFe.infNFe.det[idet].prod.vUnCom._text,
                                                            ValorProduto:  result.nfeProc.NFe.infNFe.det[idet].prod.vProd._text,
                                                            CST: result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90.orig._text + result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90.CST._text,
                                                            BaseICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90.vBC._text,
                                                            porcentagemICMS: (result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90.pICMS._text),
                                                            ValorICMS:  result.nfeProc.NFe.infNFe.det[idet].imposto.ICMS.ICMS90.vICMS._text,
                                                            ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                            BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                            ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                            valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                            valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                            valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                            valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                            valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                            valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                            valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                            valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                            valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                                      
                                                          }   
                                                      
                                                          arrayNota.push(notas)
                                        
                                        
                                                    }
    




        }

    } else {

        if (
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 != undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
            )

            { 
                var notas = {

                Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                 DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                 tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                 CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                 NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                 CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                 NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                 CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                 EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                 DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                 NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                 CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                 cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                 CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                 Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                 ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                 ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                 CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00.CST._text,
                 BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00.vBC._text,
                 porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00.pICMS._text),
                 ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00.vICMS._text,
                 ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                 BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                 ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                 valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                 valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                 valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                 valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                 valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                 valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                 valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                 valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                 valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                 valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                 valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
           
               }   
           
               arrayNota.push(notas)


            } else
            if (
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 != undefined && 
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                )
    
                { 
                    var notas = {

                        Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                        DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                        tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                        CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                        NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                        CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                        NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                        CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                        EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                        DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                        NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                        CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                        cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                        CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                        Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                        ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                        ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                        CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10.CST._text,
                        BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10.vBC._text,
                        porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10.pICMS._text),
                        ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10.vICMS._text,
                        ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                        BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                        ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                        valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                        valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                        valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                        valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                        valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                        valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                        valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                        valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                        valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                  
                      }   
                  
                      
                      arrayNota.push(notas)
    
    
                } else            
                if (
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 != undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                    )
        
                    { 
                        var notas = {

                            Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                            DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                            tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                            CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                            NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                            CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                            NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                            CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                            EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                            DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                            NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                            CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                            cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                            CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                            Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                            ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                            ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                            CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20.CST._text,
                            BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20.vBC._text,
                            porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20.pICMS._text),
                            ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20.vICMS._text,
                            ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                            BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                            ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                            valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                            valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                            valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                            valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                            valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                            valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                            valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                            valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                            valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                      
                          }   
                      
                          arrayNota.push(notas)
        
        
                    } else    
                    if (
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 != undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                        )
            
                        { 
                            var notas = {

                                Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30.CST._text,
                                BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30.vBC._text,
                                porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30.pICMS._text),
                                ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30.vICMS._text,
                                ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                          
                              }   
                          
                              arrayNota.push(notas)
            
            
                        } else
                        if (
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 != undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                            )
                
                            { 
                                var notas = {

                                    Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                    DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                    tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                    CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                    NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                    CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                    NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                    CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                    EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                    DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                    NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                    CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                    cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                    CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                    Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                    ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                    ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                    CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40.CST._text,
                                    BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 = 0,
                                    porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 = 0),
                                    ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS = 0,
                                    ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                    BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                    ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                    valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                    valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                    valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                    valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                    valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                    valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                    valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                    valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                    valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                            
                                }   
                            
                                arrayNota.push(notas)
                
                
                            } else
                            if (
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 != undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                                )
                    
                                { 
                                    var notas = {

                                        Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                        DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                        tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                        CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                        NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                        CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                        NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                        CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                        EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                        DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                        NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                        CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                        cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                        CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                        Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                        ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                        ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                        CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50.CST._text,
                                        BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50.vBC._text,
                                        porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50.pICMS._text),
                                        ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50.vICMS._text,
                                        ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                        BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                        ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                        valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                        valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                        valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                        valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                        valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                        valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                        valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                        valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                        valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                  
                                      }   
                                  
                                      arrayNota.push(notas)
                    
                    
                                } else
                                if (
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 != undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                                    result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                                    )
                        
                                    { 
                                        var notas = {

                                            Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                            DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                            tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                            CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                            NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                            CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                            NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                            CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                            EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                            DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                            NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                            CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                            cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                            CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                            Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                            ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                            ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                            CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60.CST._text,
                                            BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60.vBC._text,
                                            porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60.pICMS._text),
                                            ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60.vICMS._text,
                                            ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                            BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                            ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                            valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                            valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                            valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                            valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                            valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                            valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                            valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                            valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                            valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                            valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                      
                                          }   
                                      
                                          arrayNota.push(notas)
                        
                        
                                    } else
                                    if (
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 != undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                                        result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                                        )
                            
                                        { 
                                            var notas = {

                                                Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                                EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                                DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                                NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                                CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                                cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                                CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                                Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                                ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                                ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                                CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70.CST._text,
                                                BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70.vBC._text,
                                                porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70.pICMS._text),
                                                ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70.vICMS._text,
                                                ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                          
                                              }   
                                          
        
                                              arrayNota.push(notas)
                            
                            
                                        } else
                                        if (
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 != undefined &&
                                            result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 === undefined 
                                            )
                                
                                            { 
                                                var notas = {

                                                    Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                    DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                    tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                    CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                    NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                    CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                    NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                    CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                                    EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                                    DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                                    NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                                    CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                                    cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                                    CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                                    Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                                    ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                                    ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                                    CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80.CST._text,
                                                    BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80.vBC._text,
                                                    porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80.pICMS._text),
                                                    ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80.vICMS._text,
                                                    ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                    BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                    ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                    valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                    valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                    valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                    valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                    valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                    valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                    valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                    valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                    valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                    valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                              
                                                  }   
                                              
                                                  arrayNota.push(notas)
                                
                                
                                            } else
                                            if (
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS00 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS10 === undefined && 
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS20 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS30 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS40 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS50 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS60 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS70 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS80 === undefined &&
                                                result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90 != undefined 
                                                )
                                    
                                                { 
                                                    var notas = {

                                                        Numero: result.nfeProc.NFe.infNFe.ide.nNF._text,
                                                        DataEmissao: result.nfeProc.NFe.infNFe.ide.dhEmi._text,
                                                        tipoEmissao: result.nfeProc.NFe.infNFe.ide.tpEmis._text,
                                                        CnpjEmitente: result.nfeProc.NFe.infNFe.emit.CNPJ._text,
                                                        NomeEmitente: result.nfeProc.NFe.infNFe.emit.xNome._text,
                                                        CnpjDestinatario: result.nfeProc.NFe.infNFe.dest.CNPJ._text,
                                                        NomeDestinatario: result.nfeProc.NFe.infNFe.dest.xNome._text,
                                                        CodigoProduto:  result.nfeProc.NFe.infNFe.det.prod.cProd._text,
                                                        EAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                                        DescriçaoProduto:  result.nfeProc.NFe.infNFe.det.prod.xProd._text,
                                                        NCM:  result.nfeProc.NFe.infNFe.det.prod.NCM._text,
                                                        CEST:  result.nfeProc.NFe.infNFe.det.prod.CEST,
                                                        cEAN:  result.nfeProc.NFe.infNFe.det.prod.cEAN._text,
                                                        CFOP:  result.nfeProc.NFe.infNFe.det.prod.CFOP._text,
                                                        Quantidade:  result.nfeProc.NFe.infNFe.det.prod.qCom._text,
                                                        ValorUnitario:  result.nfeProc.NFe.infNFe.det.prod.vUnCom._text,
                                                        ValorProduto:  result.nfeProc.NFe.infNFe.det.prod.vProd._text,
                                                        CST: result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90.orig._text + result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90.CST._text,
                                                        BaseICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90.vBC._text,
                                                        porcentagemICMS: (result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90.pICMS._text),
                                                        ValorICMS:  result.nfeProc.NFe.infNFe.det.imposto.ICMS.ICMS90.vICMS._text,
                                                        ValorFECP:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                        BaseICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBC._text,
                                                        ValorICMSST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vICMS._text,
                                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCP._text,
                                                        valorBaseCalculoST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vBCST._text,
                                                        valorST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vST._text,
                                                        valorFeCPST:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST._text,
                                                        valorFeCPSTRetido:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet._text,
                                                        valorProduto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vProd._text,
                                                        valorFrete:  result.nfeProc.NFe.infNFe.total.ICMSTot.vFrete._text,
                                                        valorSeguro:  result.nfeProc.NFe.infNFe.total.ICMSTot.vSeg._text,
                                                        valorDesconto:  result.nfeProc.NFe.infNFe.total.ICMSTot.vDesc._text,
                                                        valorPIS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vPIS._text,
                                                        valorCOFINS:  result.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS._text,
                                                  
                                                      }   
                                                  
                                                      arrayNota.push(notas)
                                    
                                    
                                                }



    }



 }

//  console.log(arrayNota);

let xls = json2xls(arrayNota);
fs.writeFileSync("notafiscal.xlsx", xls, "binary")
