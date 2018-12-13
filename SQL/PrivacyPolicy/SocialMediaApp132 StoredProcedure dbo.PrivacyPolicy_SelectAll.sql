USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[PrivacyPolicy_SelectAll]    Script Date: 9/11/2018 7:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/13/2018>
-- Description:	<Select all the privacy policies>
-- =============================================
ALTER PROCEDURE [dbo].[PrivacyPolicy_SelectAll]
	-- Add the parameters for the stored procedure here
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[PrivacyPolicy_SelectAll]

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
    -- Insert statements for procedure here
	SELECT * from dbo.PrivacyPolicy
	--order by ascending order
	Order by DisplayOrder;
END
