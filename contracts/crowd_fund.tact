struct Campaign{
    owner: Address;
    goal: Int as uint256;
    pledged: Int as uint256;
    startAt: Int as uint256;
    endAt: Int as uint256;
    claimed: Bool;
}
struct PledgeDetails{
    pledger:Address;
    amount:Int as uint256;
}

message Launch{
    goal: Int as uint256;
    startAt: Int as uint256;
    endAt: Int as uint256;
}

message Cancel{
    campaignId: Int as uint256;
}

message Pledge{
    campaignId: Int as uint256;
}

message Claim{
    campaignId: Int as uint256;
}
contract CrowdFund(
    count: Int as uint256,
    campaigns: map<Int as uint256, Campaign>,
    pledges: map<Int as uint256, PledgeDetails>,

) {    

    receive() {
        cashback(sender());
    }
    
    receive(msg:Launch){
        require(msg.startAt >= now(),"Start time is in the past");
        require(msg.endAt > msg.startAt,"End time must be after start time");
        require(msg.goal > 0,"Goal must be greater than 0");
        self.count += 1;
        let campaign:Campaign = Campaign{
            owner:sender(),
            goal:msg.goal,
            pledged:0,
            startAt:msg.startAt,
            endAt:msg.endAt,
            claimed:false,
        };
        self.campaigns.set(self.count,campaign);
        cashback(sender());
    }

    receive(msg:Cancel){
        require(self.campaigns.exists(msg.campaignId),"Campaign does not exist");
        
        let campaign:Campaign? = self.campaigns.get(msg.campaignId);
        
        require(campaign!!.owner == sender(),"Only the owner can cancel the campaign");
        require(campaign!!.pledged == 0,"Cannot cancel a campaign with pledged amount");
        require(campaign!!.startAt > now(),"Campaign has already started");
        self.campaigns.del(msg.campaignId);
    }   

    receive(msg:Pledge){
        require(self.campaigns.exists(msg.campaignId),"Campaign does not exist");
        let campaign:Campaign? = self.campaigns.get(msg.campaignId);
        let context:Context = context();

        require(campaign!!.startAt <= now(),"Campaign has not started yet");
        require(campaign!!.endAt > now(),"Campaign has ended");
        require(context.value > 0,"Pledge amount must be greater than 0");

        let pledge:PledgeDetails = PledgeDetails{
            pledger:sender(),
            amount:context.value,
        };
        self.pledges.set(msg.campaignId,pledge);
        
        let updatedCampaign:Campaign = Campaign{
            owner: campaign!!.owner,
            goal: campaign!!.goal,
            pledged: campaign!!.pledged + context.value,
            startAt: campaign!!.startAt,
            endAt: campaign!!.endAt,
            claimed: campaign!!.claimed,
        };
        self.campaigns.set(msg.campaignId, updatedCampaign);
    }

    receive(msg:Claim){
        require(self.campaigns.exists(msg.campaignId),"Campaign does not exist");
        let campaign:Campaign? = self.campaigns.get(msg.campaignId);
        require(campaign!!.endAt <= now(),"Campaign has not ended yet");
        require(campaign!!.pledged >= campaign!!.goal,"Campaign goal not reached");
        require(campaign!!.claimed==false,"Campaign already claimed");
        
        message(MessageParameters{
            to:campaign!!.owner,
            value:campaign!!.pledged,
            mode:SendIgnoreErrors
        });

        let updatedCampaign:Campaign = Campaign{
            owner: campaign!!.owner,
            goal: campaign!!.goal,
            pledged: campaign!!.pledged,
            startAt: campaign!!.startAt,
            endAt: campaign!!.endAt,
            claimed: true,
        };
        self.campaigns.set(msg.campaignId,updatedCampaign);
    }

    get fun campaignDetails(campaignId:Int):Campaign{
        require(self.campaigns.exists(campaignId),"Campaign doesn't exist");
        let campaign:Campaign? = self.campaigns.get(campaignId);
        return campaign!!;
    }

    get fun totalCampaigns():Int{
        return self.count;
    }

}
