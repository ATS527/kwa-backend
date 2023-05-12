exports.leakageBenefits = async (req, res) => {
    try {
        const previous_reading = req.body.previous_reading;
        const current_reading = req.body.current_reading;

        const leakage = current_reading - previous_reading;
        
        if (leakage <= 50) {
            res.status(400).json({
                success: false,
                message: `Leakage is ${leakage} which is less than or equalt to 50,So no benefit`,
            });
            return;
        }

        const no_of_months = req.body.no_of_months;

        const leakage_benefit = ((leakage / no_of_months) - 50) * 20 * no_of_months;

        res.status(200).json({
            success: true,
            leakage: leakage,
            no_of_months: no_of_months,
            leakage_benefit: leakage_benefit,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.feeDetails = async (req, res) => {
    try {
        const tendered_pac = req.body.tendered_pac;
        const tender_fee = tendered_pac * 0.002;

        const emd = tendered_pac * 0.025;

        const quoted_amount = req.body.quoted_amount;
        const performance_gaurantee = quoted_amount * 0.03;
        const additional_performance_gaurantee = ((((tendered_pac - quoted_amount)/tendered_pac)*100-10)*tendered_pac)/100;
        const stamp_paper = quoted_amount * 0.001;

        res.status(200).json({
            success: true,
            tendered_pac,
            tender_fee,
            emd,
            quoted_amount,
            performance_gaurantee,
            additional_performance_gaurantee,
            stamp_paper
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}