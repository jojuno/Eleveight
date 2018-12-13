USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[PrivacyPolicy_Update]    Script Date: 9/11/2018 7:42:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/16/2018>
-- Description:	<Update a Privacy Policy>
-- =============================================
ALTER PROCEDURE [dbo].[PrivacyPolicy_Update]
	-- Add the parameters for the stored procedure here
	@Id int,
	@Heading nvarchar(200),
	@Body nvarchar(4000),
	@DisplayOrder int
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[PrivacyPolicy_Update]
		@Id = 2,
		@Heading = N'Sabio',
		@Body = N'We do not share student information with anyone else.',
		@DisplayOrder = 3

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Update dbo.PrivacyPolicy
	set [Heading] = @Heading,
	[Body] = @Body,
	[DisplayOrder] = @DisplayOrder,
	[ModifiedDate] = getUTCDate()
	where Id = @Id


END
