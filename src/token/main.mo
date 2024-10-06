import Principal "mo:base/Principal";
actor Token {
    //get the principal fr0m dfx identity get-principal
    //convert the text into Principal
    var owner : Principal = Principal.fromText("4snti-x4tyi-qz52y-4acvm-qimyd-ii6j4-ys3gt-qa267-sgzms-hd6l5-pae");
    //create total supply of one billion
    var totalSupply : Nat = 1000000000;
    //create token symbol
    var symbol : Text = "MOODENG";
}