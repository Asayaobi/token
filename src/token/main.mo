import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    //get the principal fr0m dfx identity get-principal
    //convert the text into Principal
    var owner : Principal = Principal.fromText("4snti-x4tyi-qz52y-4acvm-qimyd-ii6j4-ys3gt-qa267-sgzms-hd6l5-pae");
    //create total supply of one billion
    var totalSupply : Nat = 1000000000;
    //create token symbol
    var symbol : Text = "MOODENG";

    //create a ledger
    //class HashMap<K, V>(initCapacity : Nat, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash)
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    //add the owner to this ledger as the first entry
    balances.put(owner, totalSupply);

    //make a query to find out how much balance is a particular person (id) own
    public query func balanceOf(who: Principal) : async Nat {
        //func get(key : K) : (value : ?V) 
        // if (balances.get(who) == null){
        //     return 0;
        // } else {
        //     return balances.get(who)
        // }
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;
    };
    
    public query func getSymbol() : async Text {
        return symbol;
    };

    //for testing purpose
    //shared(msg) func inc() : async() {//msg.caller} - identify the principal id of a person who call this function 
    public shared(msg) func payOut() : async Text {
        //log to see the principal id of the caller
        Debug.print(debug_show (msg.caller));
        return "success";
    };
}