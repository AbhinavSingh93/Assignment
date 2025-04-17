const fs = require('fs');
const csv = require('csv-parser');

const analyzeCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const userStats = {};
    let maxUser = { userId: null, totalAmount: 0 };

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        try {
          const { UserID, Amount, TransactionType } = row;

          if (!UserID || !Amount || !TransactionType) {
            console.log('Skipping row with missing fields');
            return;
          }

          const amt = parseFloat(Amount);
          if (isNaN(amt)) {
            console.log('Skipping row with invalid amount:', Amount);
            return;
          }

          if (amt <= 0) {
            console.log('Skipping row with non-positive amount:', amt);
            return;
          }

          if (!userStats[UserID]) {
            userStats[UserID] = { credit: 0, debit: 0, total: 0 };
          }

          const type = TransactionType.trim().toLowerCase();
          if (type === 'credit') {
            userStats[UserID].credit += amt;
          } else if (type === 'debit') {
            userStats[UserID].debit += amt;
          } else {
            console.log('Skipping row with invalid transaction type:', TransactionType);
            return;
          }

          userStats[UserID].total = userStats[UserID].credit + userStats[UserID].debit;
          if (userStats[UserID].total > maxUser.totalAmount) {
            maxUser = { userId: UserID, totalAmount: userStats[UserID].total };
          }
        } catch (err) {
          console.log('Skipping bad row:', err.message);
        }
      })
      .on('end', () => resolve({ 
        userStats, 
        maxUser: maxUser.userId ? maxUser : null 
      }))
      .on('error', reject);
  });
};

module.exports = analyzeCSV;